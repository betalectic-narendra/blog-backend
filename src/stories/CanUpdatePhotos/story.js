const findKeysFromRequest = requireUtil("findKeysFromRequest");
const knex =requireKnex();
const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload=findKeysFromRequest(req,["creator_user_uuid",  "name","slug","uuid","tenant"]);
    return payload
};

const authorize = async ({ prepareResult }) => {
  try {
    return true;
  } catch (error) {
    throw error;
  }
};

const handle = async ({ prepareResult }) => {
  try {
    await knex("photos").where({uuid:prepareResult.uuid}).update(prepareResult);
    return prepareResult;
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
