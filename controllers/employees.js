const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllEmployees = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Employees" `);
    res.status(StatusCodes.OK).json({ employees: query.rows });
  } catch (error) {
    console.log(error);
  }
};
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Employees" where id=($1) `, [
      id,
    ]);
    res.status(StatusCodes.OK).json({ employee: query.rows[0] });
  } catch (error) {
    console.log(error);
  }
};
const createEmployee = async (req, res) => {
  const {
    name,
    email,
    mobileNo,
    dateOfBirth,
    genderId,
    companyId,
    accountStatusId,
  } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Employees" ("id","Name","Email", "Mobile Number", "Date of Birth", "Gender ID", "Company ID", "Account Status ID", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        id,
        name,
        email,
        mobileNo,
        dateOfBirth,
        genderId,
        companyId,
        accountStatusId,
        created,
        updated,
      ]
    );

    res.status(StatusCodes.OK).json({ employee: query.rows });
  } catch (error) {
    console.log(error);
    if (error.code === "42703") {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Data submitted for column that does not exist" });
    }
    if (error.code === "23503") {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.detail });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    mobileNo,
    dateOfBirth,
    genderId,
    companyId,
    accountStatusId,
  } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Employees" SET "Name"=($2), "Email"=($3), "Mobile Number"=($4), "Date of Birth"=($5), "Gender ID"=($6), "Company ID"=($7), "Account Status ID"=($8), "Updated"=($9) WHERE id=($1) RETURNING *`,
      [
        id,
        name,
        email,
        mobileNo,
        dateOfBirth,
        genderId,
        companyId,
        accountStatusId,
        updated,
      ]
    );
    res.status(StatusCodes.OK).json({ employee: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Employees" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ employee: query.rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
