const verifyToken=requireUtil("randomUserVerify");
const findKeysFromRequest=requireUtil("findKeysFromRequest");
const {create} =requireUtil("baseRepo");
const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const token=req.headers.authorization.split(" ")[1];
  const payload=findKeysFromRequest(req,["slug","name","content"])
  return {...payload,token};
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
    delete prepareResult.token;
    const blog= await create("blogs",{...prepareResult,creator_user_uuid:authorizeResult});
    return blog;
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
