const router = require("express").Router();
const { userController } = require("../../controllers");

router.post("/sign-up", (req, res) => userController.signUp(req, res));

router.post("/sign-in", (req, res) => userController.signIn(req, res));

router.post("/req-forgot-password", (req, res) =>
  userController.reqForgotPassword(req, res)
);

router.post("/verify-token", (req, res) =>
  userController.verifyResetToken(req, res)
);

router.post("/set-forgot-password", (req, res) =>
  userController.setForgotPassword(req, res)
);

module.exports = router;
