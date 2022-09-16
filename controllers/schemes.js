const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllSchemes = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Schemes" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, companies: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getScheme = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Schemes" where id=($1)`, [id]);
    res.status(StatusCodes.OK).json({ company: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createScheme = async (req, res) => {
  const { name, schemeCategoryId, startDate, endDate } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Schemes" ("id", "Name", "Scheme Category ID", "Start Date", "End Date", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, name, schemeCategoryId, startDate, endDate, created, updated]
    );

    res.status(StatusCodes.OK).json({ company: query.rows });
  } catch (error) {
    console.log(error);
    if (error.code === "23503") {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error.detail });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateScheme = async (req, res) => {
  const { id } = req.params;
  const { name, schemeCategoryId, startDate, endDate } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Schemes" SET "Name"=($2), "Scheme Category ID"=($3), "Start Date"=($4), "End Date"=($5), "Updated"=($6) WHERE id=($1) RETURNING *`,
      [id, name, schemeCategoryId, startDate, endDate, updated]
    );
    res.status(StatusCodes.OK).json({ company: query.rows });
  } catch (error) {
    console.log(error);
    if (error.code === "23503") {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error.detail });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteScheme = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Schemes" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ company: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllSchemes,
  getScheme,
  createScheme,
  updateScheme,
  deleteScheme,
};
