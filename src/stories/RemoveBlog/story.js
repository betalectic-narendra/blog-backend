const verifyToken=requireUtil("randomUserVerify");
const findKeysFromRequest=requireUtil("findKeysFromRequest");
const {remove}=requireUtil("baseRepo")
const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const token=req.headers.authorization.split(" ")[1];
  const payload=findKeysFromRequest(req,["uuid"])
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
    await remove("blogs",{uuid:prepareResult.uuid},)
    return {message:"Blog deleted successfully"};
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
