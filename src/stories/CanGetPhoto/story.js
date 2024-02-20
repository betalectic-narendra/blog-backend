const findKeysFromRequest=requireUtil("findKeysFromRequest");
const knex=requireKnex();
const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload=findKeysFromRequest(req,["uuid"]);
  return payload;
};

const authorize = async ({ prepareResult }) => {
  try {
    if (0) {
      throw {
        statusCode: 401,
        message: "Unauthorized",
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    let photo=await knex("photos").where({uuid:prepareResult.uuid}).first();
    return photo;
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
