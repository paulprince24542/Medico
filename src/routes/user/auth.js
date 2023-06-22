const { generate_JWT } = require("../../middlewares/jwt");

var Router = require("express").Router();

Router.post("/login", async (req, res) => {
    
  var token = await generate_JWT(req, res, next);
});

module.exports = Router;
