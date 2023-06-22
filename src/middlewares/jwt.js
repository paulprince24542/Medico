var jwt = require("jsonwebtoken");
var secret = "@#$%^&*(89709878wef(*";
function generate_JWT(data) {
  // console.log(req.headers);
  // var token = req.headers["authtoken"];
  // if(token){

  // }
  console.log(data);
  console.log("wefe");
  var token = jwt.sign(
    {
      id: data,
    },
    secret
  );
  if (token) {
    return token;
  }
}

function verify_Authorization(req, res, next) {
  try {
    console.log(req.cookies);
    console.log("ergr");
    var token = req.headers["auth"] || req.cookies["htoken"];
    console.log(token);
    if (token == "" || token == undefined) {
      res.status(400).json({ err: "Token not found." });
    } else {
      console.log(secret);
      var decoded = jwt.verify(token, secret);
      console.log(decoded.id);
      if (decoded.id) {
        req.user = decoded;
        next();
      } else {
        res.status(400).json({
          msg: "Invalid JWT key",
        });
      }
    }
  } catch (err) {}
}

function doctor_JWT(data) {
  var token = jwt.sign(
    {
      id: data,
    },
    secret
  );
  if (token) {
    return token;
  }
}

function doctor_Authorization(req, res, next) {
  try {
    console.log(req.cookies);
    console.log("ergr");
    var token = req.headers["auth"] || req.cookies["dtoken"];
    console.log(token);
    if (token == "" || token == undefined) {
      res.status(400).json({ err: "Token not found." });
    } else {
      console.log(secret);
      var decoded = jwt.verify(token, secret);
      console.log(decoded.id);
      if (decoded.id) {
        req.user = decoded;
        next();
      } else {
        res.status(400).json({
          msg: "Invalid JWT key",
        });
      }
    }
  } catch (err) {}
}

function patient_JWT(data) {
  var token = jwt.sign(
    {
      id: data,
    },
    secret
  );
  if (token) {
    return token;
  }
}

function patient_Authorization(req, res, next) {
  try {
    console.log(req.cookies);
    console.log("ergr");
    var token = req.headers["auth"] || req.cookies["ptoken"];
    console.log(token);
    if (token == "" || token == undefined) {
      res.status(400).json({ err: "Token not found." });
    } else {
      console.log(secret);
      var decoded = jwt.verify(token, secret);
      console.log(decoded.id);
      if (decoded.id) {
        req.user = decoded;
        next();
      } else {
        res.status(400).json({
          msg: "Invalid JWT key",
        });
      }
    }
  } catch (err) {}
}

module.exports = {
  generate_JWT,
  verify_Authorization,
  doctor_JWT,
  doctor_Authorization,
  patient_JWT,
  patient_Authorization
};
