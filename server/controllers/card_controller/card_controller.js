const { UnprocessableEntityError } = require("rest-api-errors");
const { CardService } = require("../../service");
const { errorHandler } = require("../../middleware/error-handler");
const { validateAddCardSchema, validateFilterSchema } = require("./validators");

const addCard = async (req, res, next) => {
  try {
    const body = await validateAddCardSchema.validateAsync(req.body);
    const createdCard = await CardService.addCard(body);

    res.status(200).send(createdCard);
  } catch (err) {
    errorHandler(err, req, res, next);
  }
};

const getAllCards = async (req, res, next) => {
  try {
    const filters = await validateFilterSchema.validateAsync(req.query);
    const allCards = await CardService.getAllCards(filters);

    res.status(200).send(allCards);
  } catch (err) {
    errorHandler(err, req, res, next);
  }
};

module.exports = {
  addCard,
  getAllCards,
};
