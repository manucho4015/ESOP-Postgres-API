const { StatusCodes } = require("http-status-codes");
const db = require("../connect/db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllAccountStatuses = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Account Statuses" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, accountStatuses: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getAccountStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `SELECT * FROM "Account Statuses" where id=($1) `,
      [id]
    );
    res.status(StatusCodes.OK).json({ accountStatus: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createAccountStatus = async (req, res) => {
  const { name } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Account Statuses" ("id", "Name", "Created", "Updated") VALUES ($1,$2, $3, $4) RETURNING *`,
      [id, name, created, updated]
    );

    res.status(StatusCodes.OK).json({ accountStatus: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateAccountStatus = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Account Statuses" SET "Name"=($2), "Updated"=($3) WHERE id=($1) RETURNING *`,
      [id, name, updated]
    );
    res.status(StatusCodes.OK).json({ accountStatus: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteAccountStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Account Statuses" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ accountStatus: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllAccountStatuses,
  getAccountStatus,
  createAccountStatus,
  updateAccountStatus,
  deleteAccountStatus,
};
