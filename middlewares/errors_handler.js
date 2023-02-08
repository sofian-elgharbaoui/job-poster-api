const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorsHandler = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else if (err instanceof UnauthenticatedError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = errorsHandler;
