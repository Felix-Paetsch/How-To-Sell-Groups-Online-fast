const CONF = require("../config.js");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("sections/rendered_sections/gruppen-0", { CONF });
    });
}