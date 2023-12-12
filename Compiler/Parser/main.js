const parse_attr = require("./parse_attr.js");
const validate_attr = require("./validate_attr.js");

const parse_main = require("./parse_main.js");

module.exports = (attr_tokens, main_tokens) => {
    const attr_parsed = parse_attr(attr_tokens);
    validate_attr(attr_parsed);

    const main_parse = parse_main(main_tokens);
    attr_parsed.push({
        name: "title",
        value: main_parse.title
    });
    return [attr_parsed, main_parse]
}