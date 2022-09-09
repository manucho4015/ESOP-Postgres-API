const { StatusCodes } = require("http-status-codes");
const db = require("../connect/db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllSchemeContributionOptions = async (req, res) => {
  try {
    const query = await db.query(
      `SELECT * FROM "Scheme Contribution Options" `
    );
    res
      .status(StatusCodes.OK)
      .json({
        count: query.rows.length,
        schemeContributionOptions: query.rows,
      });
  } catch (error) {
    console.log(error);
  }
};

const getSchemeContributionOption = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `SELECT * FROM "Scheme Contribution Options" where id=($1)`,
      [id]
    );
    res.status(StatusCodes.OK).json({ schemeContributionOption: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createSchemeContributionOption = async (req, res) => {
  const { name } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Scheme Contribution Options" ("id", "Name", "Created", "Updated") VALUES ($1,$2, $3, $4) RETURNING *`,
      [id, name, created, updated]
    );

    res.status(StatusCodes.OK).json({ schemeContributionOption: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateSchemeContributionOption = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Scheme Contribution Options" SET "Name"=($2), "Updated"=($3) WHERE id=($1) RETURNING *`,
      [id, name, updated]
    );
    res.status(StatusCodes.OK).json({ schemeContributionOption: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteSchemeContributionOption = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Scheme Contribution Options" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ schemeContributionOption: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllSchemeContributionOptions,
  getSchemeContributionOption,
  createSchemeContributionOption,
  updateSchemeContributionOption,
  deleteSchemeContributionOption,
};
