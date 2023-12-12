const template_data = require("./get_template_data.js");

const create_tree_walker = require("./tree_walker.js");

const ejs = require('ejs');
const fs = require('fs');

module.exports = (attr, tree) => {
    // Has to be done once per file
    require("./add_render_functions_to_tags.js")(template_data.tags);
    require("./add_render_to_tree.js")(tree);

    const templatePath = '../Templates/page_templates/section_template.ejs';

    const attr_requirements = attr.filter(x => x.name == "require");
    attr_requirements.forEach(x => x.name = "require_dependency");

    const content_requirements = get_tag_specific_requirements();
    const total_req = attr_requirements.concat(content_requirements);
    const [js_requirements, css_requirements] = evaluate_requirements(total_req);

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const renderedTemplate = ejs.render(templateContent, {
        template_data,
        attr,
        tree,
        js_requirements,
        css_requirements,
        get_uid: require("./uid_gen.js")
    }, { async: false });

    return renderedTemplate;


    function evaluate_requirements(req_list){
        const [js_requirements, css_requirements] = [[], []];
        
        for (let r of req_list){
            if (r.value.endsWith(".css")){
                css_requirements.push(to_absolute_path(r));
            } else if (r.value.endsWith(".js")){
                js_requirements.push(to_absolute_path(r));
            } else {
                let js_req, css_req;
                if (template_data.js_dependencies[r.value]){
                    [js_req, css_req] = evaluate_requirements(
                        dependency_file_list_to_fun_input(r, template_data.js_dependencies[r.value]
                    ));
                } else if (template_data.css_dependencies[r.value]){
                    [js_req, css_req] = evaluate_requirements(
                        dependency_file_list_to_fun_input(r, template_data.css_dependencies[r.value]
                    ));
                } else {
                    r.error(`Dependency: '${ r.value }' does not exist. Perhaps it just missed '.css' or '.js'?`);
                }
                
                js_requirements.push(...js_req);
                css_requirements.push(...css_req);
            }
        }

        return [js_requirements, css_requirements];

        function to_absolute_path(r){
            const server_prefix = "<%- CONF.host %>";

            if (r.value.startsWith("http://") || r.value.startsWith("https://")) return r;
            if (r.value.startsWith("%")){
                return `${ server_prefix }${ r.value.substring(1) }`;
            }
            if (r.value.startsWith("$")){
                return `${ server_prefix }/article_dependencies${ r.value.substring(1) }`;
            }
            
            r.error("Unexpected dependency path");
        }

        function dependency_file_list_to_fun_input(r, fl){
            if  (typeof fl == "string") {
                return [{
                    value: fl,
                    line: r.line,
                    error: r.error,
                    name: "dependency_chain_dependency"
                }]
            } else if (Array.isArray(fl)){
                return fl.map(x => {
                    return {
                        value: x,
                        line: r.line,
                        error: r.error,
                        name: "dependency_chain_dependency"
                    }
                });
            }
            
            r.error("Required dependency has a bug!");
        }
    }

    function get_tag_specific_requirements(){
        const req = [];

        const walker = create_tree_walker(tree);
        for (const node of walker){
            if (typeof node.dependencies !== "undefined"){
                req.push(...node.dependencies.map(d => {
                    return {
                        value: d,
                        line: node.line,
                        error: node.error,
                        name: "specified_dependency"
                    }
                }));
            }

            if (node.type == "TAG"){
                const template = template_data.get_tag_template_for_node(node);
                req.push(...template.meta_data.requirements.map(d => {
                    return {
                        value: d,
                        line: node.line,
                        error: node.error,
                        name: "tag_dependency"
                    }
                }));
            }
        }
        return req;
    }
}