const validator = requireValidator();
const knex = requireKnex();
const bcrypt = require("bcrypt");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const generateToken=requireUtil("randomUser");
const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["email", "password"]);
  return payload;
};

const authorize = () => {
  return true;
};

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
    const user = await knex("users")
      .where({ email: prepareResult.email })
      .first();

    if (!user) {
      throw {
        statusCode: 401,
        message: "Invalid username or password",
      };
    }

    const passwordCheck = await bcrypt.compare(
      prepareResult.password,
      user.password
    );

    if (passwordCheck) {
      const {token}=await generateToken(user.uuid);
      return {token};
    } else {
      throw {
        statusCode: 401,
        message: "Invalid username or password",
      };
    }
  } catch (error) {
    throw error;
  }
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
