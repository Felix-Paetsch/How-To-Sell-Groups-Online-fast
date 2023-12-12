module.exports = (parsed_lines) => {
    let res = parse_from_indent("root", 0);
    return res;

    function parse_from_indent(parent, indent){
        let res = []; // Children of parent

        // a) we done
        if (parsed_lines.length == 0) return res;

        // b) tag start
        if (parsed_lines[0].type == "TAG_START"){
            if (parsed_lines[0].amt > indent){
                const l = parsed_lines.shift();
                const ret = {
                    type: "TAG",
                    line: l.line,
                    error: l.error,
                    string_attributes: l.string_attributes,
                    name: l.tag_name,
                    attributes: l.attributes,
                    parent
                }
                ret.content = parse_from_indent(ret, l.amt)
                return [ret].concat(parse_from_indent(parent, indent));
            } else {
                return [];
            }
        }

        // c) tag end
        if (parsed_lines[0].type == "TAG_END"){
            if (parsed_lines[0].amt < indent){
                return [];
            } else if (parsed_lines[0].amt == indent) {
                const l = parsed_lines.shift();
                return [];
            } else {
                parsed_lines[0].line.error("Opening tag not found");
            }
        }

        // d) text
        if (parsed_lines[0].type == "TEXT"){
            const l = parsed_lines.shift();
            return [{
                type: "TEXT",
                line: l.line,
                error: l.error,
                text_sections: l.text_sections,
                parent
            }].concat(parse_from_indent(parent, indent)); 
        }

        // e) list
        if (parsed_lines[0].type == "LIST_ITEM"){
            const res = {
                type: "LIST",
                line: parsed_lines[0].line,
                error: parsed_lines[0].error,
                list_type: parsed_lines[0].list_type,
                parent
            };

            res.list_items = parse_list_items(res, parsed_lines[0].list_type)
            return [res].concat(parse_from_indent(parent, indent)); 
        }

        // f) embeddings
        if (["HTML_EMBEDDING", "JS_EMBEDDING", "CSS_EMBEDDING"].includes(parsed_lines[0].type)){
            return [
                {
                    ...parsed_lines.shift(),
                    parent
                }
            ].concat(parse_from_indent(parent, indent)); 
        }

        throw new Error("Line: " + JSON.stringify(parsed_lines[0], true, 2) + "\nCould not be merged.");
    }

    function parse_list_items(parent, list_type){
        let res = [];
        while (parsed_lines.length > 0 && parsed_lines[0].type == "LIST_ITEM" && parsed_lines[0].list_type == list_type){
            res.push({
                ...parsed_lines.shift(),
                parent
            });
        }
        return res;
    }
}