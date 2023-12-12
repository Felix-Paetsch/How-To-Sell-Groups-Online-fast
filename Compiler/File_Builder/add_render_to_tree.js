const create_tree_walker = require("./tree_walker.js");
const template_data = require("./get_template_data.js");
const ejs = require("ejs");

module.exports = (tree) => {
    const walker = create_tree_walker(tree);
    for (const node of walker){
        if (node.type == "TEXT"){
            node.render_self = () => { 
                return `<p class="text_section">${ 
                    node.text_sections.map(t => render_text_section(t)).join("\n")
                }</p>`};
        } else if (node.type == "LIST"){
            node.list_items.forEach(li => {
                li.render_self = () => {
                    return li.parsed_text.text_sections.map(t => render_text_section(t)).join("\n")
                }
            });

            node.render_self = () => {return ejs.render(
                template_data.std_tags.list,
                {
                    ...node,
                    get_uid: require("./uid_gen.js")
                }, { async: false }
            );}

        } else if (node.type == "HTML_EMBEDDING") {
            node.render_self = () => {
                return node.text;
            }
        } else if (node.type == "JS_EMBEDDING") {
            node.render_self = () => {
                return `<script>{\n${ node.text }\n}</script>`;
            }
        } else if (node.type == "CSS_EMBEDDING") {
            node.render_self = () => {
                return `<style>${ node.text }</style>`;
            }
        } else if (node.type == "TAG") {
            const tag = template_data.get_tag_template_for_node(node);
            node.render_self = () => {
                verify_string_attributes(node, tag);
                node.attributes = format_attributes(node, tag);
                return tag.render(node.content, node.attributes, node.string_attributes)
            }
        } else {
            console.log("N:", node);
        }
    }
}

function render_text_section(t){
    if (t.type == "MD_TEXT"){
        return t.content.children.map(c => render_md_text(c)).join("");
    } else if (t.type == "MULTILINE_TEXT") {
        return t.content;
    }
    
    throw new Error("Unexpected Text Section:", t);
}

function render_md_text(c){
    if (c.type == "text") return c.value;
    if (c.type == "bold") return `<b>${
        c.children.map(x => render_md_text(x)).join("")
    }</b>`;
    if (c.type == "italics") return `<i>${
        c.children.map(x => render_md_text(x)).join("")
    }</i>`;
    if (c.type == "strikethrough") return `<s>${
        c.children.map(x => render_md_text(x)).join("")
    }</s>`;
    if (c.type == "underline") return `<u>${
        c.children.map(x => render_md_text(x)).join("")
    }</u>`;
    if (c.type == "link") return `<a href="${ c.url }">${
        c.text
    }</a>`;
    if (c.type == "bold-italics") return `<b><i>${
        c.children.map(x => render_md_text(x)).join("")
    }</b></i>`;
    throw new Error("Unexpected text token:", c-type);
}

function verify_string_attributes(node, tag){
    if (typeof tag.meta_data.string_attributes == "number"){
        if (node.string_attributes.length != tag.meta_data.string_attributes){
            node.error("Wrong amount of string attributes. Expected:", tag.meta_data.string_attributes);
        }
    } else if (typeof tag.meta_data.string_attributes == "object"){
        if (
            (
                node.string_attributes.length > tag.meta_data.string_attributes[1]
                && tag.meta_data.string_attributes[1] !== -1
            )
            || (
                node.string_attributes.length < tag.meta_data.string_attributes[0]
            )
        ){
            node.error("Wrong amount of string attributes. Expected in range:", JSON.stringify(tag.meta_data));
        }
    }
}

function format_attributes(node, tag){
    const res = {};

    // Set Attributes
    for (const node_attr of node.attributes){
        const attr_name = node_attr.attr_name.toLowerCase();

        const attr = tag.attr.filter(a => a.name.toLowerCase() == attr_name)[0]

        if (typeof attr == "undefined"){
            node.error(`Unknown attribute '${ node_attr.attr_name }'`);
        }

        if (typeof res[attr_name] !== "undefined"){
            node.error(`Attribute specified twice: '${ node_attr.attr_name }'`);
        }

        
        if (attr.type !== "Bool"){
            throw new Error("Todo"); 
        }

        res[attr_name] = {
            is_specified: true,
            name: attr_name,
            value: true,
            type: "Bool"
        }
    }

    // Set non present attributes and check for options
    for (const tag_attr of tag.attr){
        if (res[tag_attr.name.toLowerCase()]) continue;
        
        res[tag_attr.name.toLowerCase()] = {
            is_specified: true,
            name: attr_name,
            value: get_default_tag_attr_value(tag_attr),
            type: tag_attr.type
        }

        console.log(tag_attr);
    }

    return node.attributes;
}

function get_default_tag_attr_value(tag_attr){
    if (tag_attr.type == "Bool"){
        return false;
    }
    throw new Error("Todo");
}