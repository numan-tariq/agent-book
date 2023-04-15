const router = require("express").Router();

// users apis
router.use("/api/user", require("./users/users"));

// projects apis
router.use("/api/project", require("./projects/projects"));

// cards apis
router.use("/api/card", require("./cards/cards"));

module.exports = router;
