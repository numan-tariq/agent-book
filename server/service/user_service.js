const jwt = require("jsonwebtoken");
const {
  InternalServerErrorError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("rest-api-errors");
const { User } = require("../models");

/**
 * It uses the getUserByEmail function to check if a user already exists with the same email address. If a user is found, a ConflictError with a status code of 409 and an error message of "User has already exist with this email!" is thrown.
 * If the user does not exist, the function uses the create method of the Users model to create a new user in the database with the given user object.
 * @param {*} user
 * @returns
 */
const signUp = async (user) => {
  try {
    const isUserExist = await getUserByEmail(user.email);
    if (isUserExist)
      throw new ConflictError(409, "User has already exist with this email!");

    const createdUser = await User.create(user);
    if (createdUser)
      return { code: 200, message: "User has created Successfully!" };
  } catch (error) {
    throw error || new InternalServerErrorError("Failed to create user");
  }
};

/**
 * It uses the findOne method of the Users model to query the database for a user with the specified email.
 * If a user is found, it is returned as an object. If there is an error, it is caught and a new InternalServerErrorError with a status code of 500
 *
 * The raw: true option in the findOne method tells Sequelize to return the plain JSON object instead of a Sequelize model instance.
 * @param {*} email
 * @returns
 */
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email }, raw: true });
    return user;
  } catch (err) {
    throw (
      err || new InternalServerErrorError(500, "Failed to find user by email!")
    );
  }
};

/**
 * If a user is found and the password is correct, a JWT token is created using the jsonwebtoken package, with an expiration time of 1 day.
 * The user details, including the id, firstName, lastName, and email, are extracted from the loggedInUser object and returned along with the token as a success message with a status code of 200.
 *
 * This function that I have defined a validPassword method on Users model to check if the password entered by the user matches the password stored in the database.
 * @param {*} user
 * @returns
 */
const signIn = async (user) => {
  try {
    // finding a user with email
    const loggedInUser = await User.findOne({
      where: { email: user.email },
    });

    // if user not found or password is incorrect, returning an error with Invalid Credentials
    if (!loggedInUser) {
      throw new UnauthorizedError(401, "Invalid Credentials");
    } else if (!(await loggedInUser.validPassword(user.password)))
      throw new UnauthorizedError(401, "Invalid Credentials");

    // Create and assign JWT token with 1 day expiry time
    const token = jwt.sign({ _id: loggedInUser.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const { id, firstName, lastName, email } = loggedInUser;

    return {
      code: 200,
      token,
      user: { id, firstName, lastName, email },
    };
  } catch (error) {
    throw error || new InternalServerErrorError("Failed to Sign in user");
  }
};

/**
 * We can send reset password link to the user email, when the user click on the link the frontend page should be open
 * like change your password, or enter new password.
 * Meanwhile we also need to send a request for verifying token, is this link expired? is this link already used?
 *
 * For verifying the token, i have created a new api verifyResetToken below.
 * @param {*} email the email of the user who is request for reset password.
 * @returns resetPasswordLink
 */
const reqForgotPassword = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError(404, "User does not exist.");
  } else {
    const resetPasswordToken = jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    await User.update({ resetPasswordToken }, { where: { email } });

    const updatedUser = await User.findOne({
      where: { email },
      attributes: ["id", "email", "firstName", "resetPasswordToken"],
    });

    if (updatedUser.resetPasswordToken) {
      const resetPasswordLink = `${process.env.URL}/reset-password/${updatedUser.id}/${updatedUser.resetPasswordToken}`;

      return { code: 200, message: "Success!", link: resetPasswordLink };
    }
  }
};

/**
 * If the token is invalid or has expired, a UnauthorizedError with an error message of "Invalid / Expired Token" is thrown.
 * @param {*} id id of the user
 * @param {*} token the token need to be verify in this request
 */
const verifyResetToken = async (id, token) => {
  const verify = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findOne({
    where: { id, resetPasswordToken: token },
  });

  if (!verify || !user) {
    throw new UnauthorizedError("Invalid / Expired Token");
  }
};

/**
 * The function first uses the verify method of the jsonwebtoken package to decode the token using the process.env.TOKEN_SECRET environment variable. If the token is invalid or has expired, a UnauthorizedError with an error message of "Invalid token. Try requesting a new password reset." is thrown.
 * If the token is valid, the function then uses the update method of the Users model to update the user's password and set resetPasswordToken to null.
 * The update query also checks that the userId and token match to ensure that only the correct user is updating their password.
 * @param {*} userId
 * @param {*} token
 * @param {*} newPassword
 * @returns success message
 */
const setForgotPassword = async (userId, token, newPassword) => {
  const verify = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!verify) {
    throw new UnauthorizedError(
      400,
      "Invalid token. Try requesting a new password reset."
    );
  }

  const updatedUser = await User.update(
    { password: newPassword, resetPasswordToken: null },
    { where: { id: userId, resetPasswordToken: token } }
  );
  if (updatedUser) {
    return { message: "Successfully reset password" };
  }
};

module.exports = {
  signUp,
  signIn,
  reqForgotPassword,
  verifyResetToken,
  setForgotPassword,
};
