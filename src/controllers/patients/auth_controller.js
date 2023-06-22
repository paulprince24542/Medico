var { client } = require("../../config/dbConfig");
const { generate_JWT } = require("../../middlewares/jwt");

async function patientLogin(req, res, next) {
  try {
    var findUser = await client.query(
      "SELECT id, password FROM users WHERE username = $1",
      [req.body.username]
    );
    if (findUser.rowCount == 1) {
      if ((req.body.password = findUser.rows[0].password)) {
        var jwt_token = await generate_JWT(findUser.rows[0].id);
        if (jwt_token) {
          res.cookie('htoken', jwt_token).status(200).json({
            status: true,
            token: jwt_token,
          });
        }
      }else{
        res.status(400).json({
          status: false,
          msg: "password incorrect",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "username not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  patientLogin,
};
