const crudHelpers = requireUtil("crudHelpers");
const knex = requireKnex();
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const table = "photos";


const prepare = ({ req, operation }) => {
  const payload = findKeysFromRequest(req,["creator_user_uuid","name","slug"])
  return payload

};

const authorize = async ({ prepareResult, operation }) => {
    if (operation === "create") {
    return true;
  } else {
    return true;
  }
};

const handle = async ({ prepareResult, operation }) => {
  try {
    const photos=await knex("photos").insert({
      creator_user_uuid:prepareResult.creator_user_uuid,
      name:prepareResult.name,
      slug:prepareResult.slug
    }).returning("*");
    return photos[0];
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult, operation }) => {
  try {
    return handleResult
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