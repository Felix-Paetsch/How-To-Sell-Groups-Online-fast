// Load tags And (possible) Dependencies
const fs = require('fs');
const path = require('path');

const js_template_fp = '../Templates/js_dependencies/dependency_map.json';
const jsonData = fs.readFileSync(js_template_fp, 'utf-8');
const js_dependencies = JSON.parse(jsonData);

const css_template_fp = '../Templates/css_dependencies/dependency_map.json';
const cssData = fs.readFileSync(css_template_fp, 'utf-8');
const css_dependencies = JSON.parse(cssData);

const tagsArray = [];

function processtagFolder(folderPath) {
    const folderContents = fs.readdirSync(folderPath);

    let tagObject = {
        meta_data: null,
        css: null,
        js: null,
        ejs: null
    };

    for (const item of folderContents) {
        const itemPath = path.join(folderPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isFile()) {
            const ext = path.extname(item).toLowerCase();

            if (ext === '.json') {
                tagObject.meta_data = JSON.parse(fs.readFileSync(itemPath, 'utf-8'));
            } else if (ext === '.css') {
                tagObject.css = fs.readFileSync(itemPath, 'utf-8');
            } else if (ext === '.js') {
                tagObject.js = fs.readFileSync(itemPath, 'utf-8');
            } else if (ext === '.ejs') {
                tagObject.ejs = fs.readFileSync(itemPath, 'utf-8');
            }
        } else if (stats.isDirectory()) {
            processtagFolder(itemPath);
        }
    }

    // Check if ejs property is null, and throw an error if necessary
    if (!tagObject.meta_data) {
        return;
    };
    
    if (tagObject.ejs === null){
        throw new Error(`Missing EJS file in folder: ${folderPath}`);
    }
    
    // Parse attributes with types and so on 
    if (!tagObject.meta_data.attr){
        tagObject.meta_data.attr = []
    }

    if (!tagObject.meta_data.name){
        throw new Error("No name specified for tag!");
    }

    tagObject.name = tagObject.meta_data.name

    tagObject.attr = []; // Parsed attr

    for (const a of tagObject.meta_data.attr){
        if (typeof a == "string"){
            tagObject.attr.push({
                "type": "Bool",
                "name": a
            });
        } else {
            throw new Error("Todo:", tagObject.attr);
        }
    }

    tagsArray.push(tagObject);
}

const tagsRootFolder = '../Templates/tags';
processtagFolder(tagsRootFolder);

module.exports = {
    tags: tagsArray,
    js_dependencies,
    css_dependencies,
    std_tags: {
        // until we have more, this is quite the non "best pratice" approach.
        "list": fs.readFileSync('../Templates/std_tags/List/list.ejs', 'utf-8')
    },
    get_tag_template_for_node: function get_tag_template_for_node(node){
        let possible_node_names = [node.name.toLowerCase()];
        let p = node;
        while (p.parent !== "root"){
            p = p.parent;
            possible_node_names.push(
                p.name.toLowerCase() + "::" + possible_node_names[possible_node_names.length - 1]
            );
        }
    
        for (let r of tagsArray){
            // Loop through all possible node names. If any of them matches with the tag name we found it
            
            if (possible_node_names.includes(r.meta_data.name.toLowerCase())){
                return r
            }
        }
        
        node.error("Unspecified tag");
    }
}