var nJwt = require("njwt");
var uuid = require("uuid");

const verifyToken = async(token = "") => {
  const jwtData= await nJwt.verify(token, "we-dont-care-cuz-this-is-only-for-testing");
  return {
    uuid:jwtData.body.sub
  };
};

module.exports = verifyToken;
