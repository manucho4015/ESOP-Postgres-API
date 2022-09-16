const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllSchemeEligibilityTypes = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Scheme Eligibility Types" `);
    res.status(StatusCodes.OK).json({
      count: query.rows.length,
      schemeEligibilityTypes: query.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSchemeEligibilityType = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `SELECT * FROM "Scheme Eligibility Types" where id=($1)`,
      [id]
    );
    res.status(StatusCodes.OK).json({ schemeEligibilityType: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createSchemeEligibilityType = async (req, res) => {
  const { name } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Scheme Eligibility Types" ("id", "Name", "Created", "Updated") VALUES ($1,$2, $3, $4) RETURNING *`,
      [id, name, created, updated]
    );

    res.status(StatusCodes.OK).json({ schemeEligibilityType: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateSchemeEligibilityType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Scheme Eligibility Types" SET "Name"=($2), "Updated"=($3) WHERE id=($1) RETURNING *`,
      [id, name, updated]
    );
    res.status(StatusCodes.OK).json({ schemeEligibilityType: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteSchemeEligibilityType = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Scheme Eligibility Types" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ schemeEligibilityType: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllSchemeEligibilityTypes,
  getSchemeEligibilityType,
  createSchemeEligibilityType,
  updateSchemeEligibilityType,
  deleteSchemeEligibilityType,
};
