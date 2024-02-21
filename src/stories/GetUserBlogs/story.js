const knex=requireKnex();
const {findAll}=requireUtil("baseRepo");
const verifyToken=requireUtil("randomUserVerify")
const prepare = ({ reqQuery, reqBody, reqParams, req }) => {

  const token=req.headers.authorization.split(" ")[1];
  return {token};
};

const authorize = async ({ prepareResult }) => {
  try {
    const {uuid}=await verifyToken(prepareResult.token);
    if (!uuid) {
      throw {
        statusCode: 401,
        message: "Unauthorized",
      };
    }
    return uuid;
  } catch (error) {
    throw error;
  }
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    const userBlogs=await findAll("blogs",{creator_user_uuid:authorizeResult});
    return userBlogs;
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
