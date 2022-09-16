const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllShareTransactionTypes = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Share Transaction Types" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, shareTransactionTypes: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getShareTransactionType = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `SELECT * FROM "Share Transaction Types" where id=($1)`,
      [id]
    );
    res.status(StatusCodes.OK).json({ shareTransactionType: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createShareTransactionType = async (req, res) => {
  const { name } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Share Transaction Types" ("id", "Name", "Created", "Updated") VALUES ($1,$2, $3, $4) RETURNING *`,
      [id, name, created, updated]
    );

    res.status(StatusCodes.OK).json({ shareTransactionType: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateShareTransactionType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Share Transaction Types" SET "Name"=($2), "Updated"=($3) WHERE id=($1) RETURNING *`,
      [id, name, updated]
    );
    res.status(StatusCodes.OK).json({ shareTransactionType: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteShareTransactionType = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Share Transaction Types" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ shareTransactionType: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllShareTransactionTypes,
  getShareTransactionType,
  createShareTransactionType,
  updateShareTransactionType,
  deleteShareTransactionType,
};
