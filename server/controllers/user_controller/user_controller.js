const { UserService } = require("../../service");
const {
  validateUserSignUpSchema,
  validateUserSignInSchema,
  validateReqForgotPasswordSchema,
} = require("./validators");
const { errorHandler } = require("../../middleware/error-handler");
const {
  UnprocessableEntityError,
  BadRequestError,
} = require("rest-api-errors");

const signUp = async (req, res, next) => {
  try {
    const body = await validateUserSignUpSchema.validateAsync(req.body);
    const createdUser = await UserService.signUp(body);

    res.status(200).send(createdUser);
  } catch (err) {
    if (err.details) {
      return errorHandler(
        new UnprocessableEntityError(422, err.details[0].message)
      );
    }
    errorHandler(err, req, res, next);
  }
};

const signIn = async (req, res, next) => {
  try {
    const body = await validateUserSignInSchema.validateAsync(req.body);
    const user = await UserService.signIn(body);

    res.status(200).send(user);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const reqForgotPassword = async (req, res, next) => {
  try {
    const body = await validateReqForgotPasswordSchema.validateAsync(req.body);
    const passwordResetUser = await UserService.reqForgotPassword(body);

    res.send(passwordResetUser);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const verifyResetToken = async (req, res, next) => {
  try {
    const { id, token } = req.body;
    const tokenPayload = await UserService.verifyResetToken(id, token);
    if (tokenPayload && tokenPayload.err) {
      throw new BadRequestError("Invalid / Expired Token");
    } else {
      return res.send({ msg: "Valid token!" });
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const setForgotPassword = async (req, res, next) => {
  try {
    const { id, token, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      throw new BadRequestError("New Passwords don't match");

    const setForgotPasswordResponse = await UserService.setForgotPassword(
      id,
      token,
      password
    );
    if (setForgotPasswordResponse.err) {
      throw new BadRequestError("Invalid / Expired Token");
    } else {
      return res.send({ msg: "Successfully reset password" });
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

module.exports = {
  signUp,
  signIn,
  reqForgotPassword,
  verifyResetToken,
  setForgotPassword,
};
