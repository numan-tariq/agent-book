const { InternalServerErrorError } = require("rest-api-errors");
const { Project } = require("../models");

/**
 * It uses the findAll method of the Project model to retrieve all projects from the database. This method returns a promise that resolves to an array of project objects.
 * @returns all projects
 */
const getAllProjects = async () => {
  try {
    return await Project.findAndCountAll({
      attributes: ['id', 'name', 'description']
    });
  } catch (error) {
    throw error || new InternalServerErrorError("Failed to get all projects");
  }
};

/**
 * t uses the findOne method of the Project model to find a single project with the specified id. This method returns a promise that resolves to the project object if it exists, or null if no project is found.
 * @param {*} id 
 * @returns project which is fetched by the id
 */
const getProjectById = async (id) => {
  try {
    return await Project.findOne({
      where: { id },
      attributes: ['id', 'name', 'description']
    });
  } catch (error) {
    throw error || new InternalServerErrorError("Failed to get a project by id");
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
};
