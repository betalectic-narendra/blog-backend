const validator = requireValidator();
const bcrypt = require("bcrypt");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const {create}=requireUtil("baseRepo")
const validateInput = async (prepareResult) => {
  const constraints = {
    email: {
      email: true,
      presence: {
        allowEmpty: false,
        message: "^Please enter email",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Please enter password",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult }) => {
  try {
    await validateInput(prepareResult);
    const hash = await bcrypt.hash(prepareResult.password, 10);
   return create("users",{
      email: prepareResult.email,
      password: hash,
    })
  } catch (error) {
    throw error;
  }
};

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["email", "password"]);
  return payload;
};


const authorize = () => {
  return true;
};



const respond = async ({ handleResult }) => {
  try {
    return handleResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
