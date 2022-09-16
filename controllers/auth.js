const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../errors/custom-error");

const db = require("../connect/heroku_db");

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = await db.query(`SELECT * FROM "Users" where "Email"=($1) `, [
    email,
  ]);
  if (query.rows.length === 0) {
    throw new CustomAPIError(StatusCodes.NOT_FOUND, "User not found!");
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    query.rows[0].Password
  );
  if (!isPasswordCorrect) {
    throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Invalid Password");
  }

  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.status(StatusCodes.OK).json({ msg: "Logged In", token });
};

module.exports = login;
