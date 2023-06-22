var { client } = require("../../config/dbConfig");
const { generate_JWT } = require("../../middlewares/jwt");

async function hospitalLogin(req, res, next) {
  try {
    var findUser = await client.query(
      "SELECT hospital_id, password FROM tbl_hospital WHERE username = $1",
      [req.body.username]
    );
    if (findUser.rowCount == 1) {
      if (req.body.password == findUser.rows[0].password) {
        var jwt_token = await generate_JWT(findUser.rows[0].hospital_id);
        if (jwt_token) {
          res.cookie("htoken", jwt_token).status(200).json({
            status: true,
            token: jwt_token,
          });
        }
      } else {
        res.status(400).json({
          status: false,
          msg: "password incorrect",
        });
      }
    } else {
      res.status(400).json({
        msg: "username not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  hospitalLogin,
};
