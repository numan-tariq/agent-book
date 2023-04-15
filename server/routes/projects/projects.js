const router = require("express").Router();
const { projectController } = require("../../controllers");
const { verifyToken } = require("../../middleware/verify-token");

router.get("/", verifyToken(), (req, res) =>
  projectController.getAllProjects(req, res)
);

module.exports = router;
