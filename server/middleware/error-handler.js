const { APIError, InternalServerErrorError } = require('rest-api-errors');
const { DatabaseError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.table([
      {
        environment: process.env.NODE_ENV,
        endpoint: `${req?.method} ${req?.url}`,
        message: err?.message,
        query: req?.query,
        params: req?.params,
        body: req?.body,
      },
    ]);
    console.error('stack:', err.stack || 'not available');
  }

  if (err instanceof APIError) {
    return res.status(err?.status).send({
      error: true,
      message: err.message,
      code: err.code,
    });
  }

  const error = new InternalServerErrorError();

  if (err instanceof DatabaseError) {
    console.log('SQL:', err.sql);
    return res.status(error?.status).send({
      error: true,
      code: err.code,
      message: error.message,
    });
  }

  return res.status(err?.status || error?.status).json({
    code: err.code || error.code,
    message: err.message || error.message,
  });
};

module.exports = { errorHandler };
