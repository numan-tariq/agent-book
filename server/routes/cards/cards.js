const router = require("express").Router();
const { cardController } = require("../../controllers");
const { verifyToken } = require("../../middleware/verify-token");

router.post("/", verifyToken(), (req, res) => cardController.addCard(req, res));

router.get("/", verifyToken(), (req, res) =>
  cardController.getAllCards(req, res)
);

module.exports = router;
