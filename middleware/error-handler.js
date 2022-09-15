const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    console.log(err);
    return res.status(err.StatusCode).json({ msg: err.msg });
  }
  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "An error occured. Try again later!" });
};

module.exports = errorHandlerMiddleware;
