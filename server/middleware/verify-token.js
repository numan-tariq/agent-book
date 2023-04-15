const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("rest-api-errors");
const { errorHandler } = require("./error-handler.js");

/**
 * validates wether the user is authenticated to use the API or not.
 * @returns Calls next chained function or returns error response to user.
 */
const verifyToken = () => async (req, res, next) => {
  try {
    // check if request has authorization header
    if (!req.headers.authorization) {
      throw new UnauthorizedError(401, "Unauthorized");
    }

    // get token from request header
    const token = req.headers.authorization.split(" ")[1];

    // verify token
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.message === "jwt expired")
      return errorHandler(
        new UnauthorizedError(401, "Session Expired"),
        req,
        res
      );
    errorHandler(err, req, res);
  }
};

module.exports = {
  verifyToken,
};
