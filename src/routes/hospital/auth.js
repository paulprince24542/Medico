const { hospitalLogin } = require("../../controllers/hospital/auth_controller");

var Router = require("express").Router();

Router.post("/login", (req, res, next) => {
  try {
    hospitalLogin(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
