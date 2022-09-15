const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Provide a valid token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    throw new CustomAPIError(
      StatusCodes.BAD_REQUEST,
      "Invalid Credentials. Token may have expired"
    );
  }
};

module.exports = authenticationMiddleware;
