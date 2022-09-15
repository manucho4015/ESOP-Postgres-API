const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const date = require("date-and-time");

const db = require("../connect/heroku_db");

const getAllUsers = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Users" `);
    res.status(StatusCodes.OK).json({ users: query.rows });
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Users" where id=($1) `, [id]);
    res.status(StatusCodes.OK).json({ user: query.rows });
  } catch (error) {
    console.log(error);
  }
};
const createUser = async (req, res) => {
  const {
    username,
    firstName,
    middleName,
    lastName,
    email,
    mobileNo,
    password,
    userGroupId,
    tenantId,
  } = req.body;

  try {
    const id = uniqid();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Users" ("id","username","First Name", "Middle Name", "Last Name", "Email", "Mobile Number", "Password", "User Group ID", "Tenant ID", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        id,
        username,
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        hashPassword,
        userGroupId,
        tenantId,
        created,
        updated,
      ]
    );

    console.log(hashPassword);
    res.status(StatusCodes.OK).json({ user: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    firstName,
    middleName,
    lastName,
    email,
    mobileNo,
    password,
    userGroupId,
    tenantId,
  } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Users" SET "username"=($1),"First Name"=($2), "Middle Name"=($3), "Last Name"=($4), "Email"=($5), "Mobile Number"=($6), "Password"=($7), "User Group ID"=($8), "Tenant ID"=($9), "Updated"=($10) WHERE id=($11) RETURNING *`,
      [
        username,
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        password,
        userGroupId,
        tenantId,
        updated,
        id,
      ]
    );
    res.status(StatusCodes.OK).json({ user: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Users" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ user: query.rows });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
