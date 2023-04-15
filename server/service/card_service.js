const { InternalServerErrorError, UnprocessableEntityError } = require("rest-api-errors");
const { Card } = require("../models");
const { getProjectById } = require("./project_service");

/**
 * It first calls a getProjectById function to check if a project exists with the project_id specified in the card object. If no project is found, it throws an UnprocessableEntityError with a custom error message. This is to ensure that the card is associated with an existing project.
 * It then uses the create method of the Card model to create a new card in the database with the data specified in the card object. 
 * @param {*} card 
 * @returns This method returns a promise that resolves to the newly created card object.
 */
const addCard = async (card) => {
  try {
    // checking if project is exist with project_id or not
    const project = await getProjectById(card.project_id);
    if (!project) throw new UnprocessableEntityError(422, "Project not exist with this project_id");

    return await Card.create(card);
  } catch (error) {
    throw error || new InternalServerErrorError("Failed to create a card");
  }
};

/**
 * Function that retrieves a list of cards. It accepts an optional filters object as a parameter, which can contain a status field to filter the cards by their status.
 * It then uses the findAndCountAll method of the Card model to retrieve the cards from the database. This method returns an object with two properties: rows, which is an array of card objects, and count, which is the total number of cards that match the query.
 * @param {*} filters 
 * @returns 
 */
const getAllCards = async (filters) => {
  try {
    // if status filter exist, then query will run according to the status filter
    const _where = {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.project_id ? { project_id: filters.project_id } : {}),
    };

    return await Card.findAndCountAll({
      where: _where,
      attributes: [
        "id",
        "title",
        "description",
        "status",
        "project_id",
        "createdAt",
      ],
    });
  } catch (error) {
    throw error || new InternalServerErrorError("Failed to get all cards");
  }
};

module.exports = {
  addCard,
  getAllCards,
};
