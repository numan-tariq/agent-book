const { ProjectService } = require("../../service");
const { errorHandler } = require("../../middleware/error-handler");
const { UnprocessableEntityError } = require("rest-api-errors");

const getAllProjects = async (req, res, next) => {
  try {
    const allProjects = await ProjectService.getAllProjects();

    res.status(200).send(allProjects);
  } catch (err) {
    if (err.details) {
      return errorHandler(
        new UnprocessableEntityError(422, err.details[0].message)
      );
    }
    errorHandler(err, req, res, next);
  }
};

module.exports = {
  getAllProjects,
};
