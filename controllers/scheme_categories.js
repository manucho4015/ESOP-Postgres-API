const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllSchemeCategories = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Scheme Categories" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, schemeCategories: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getSchemeCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `SELECT * FROM "Scheme Categories" where id=($1)`,
      [id]
    );
    res.status(StatusCodes.OK).json({ schemeCategory: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createSchemeCategory = async (req, res) => {
  const {
    name,
    code,
    description,
    companyId,
    schemeEligibilityTypeId,
    schemeContributionOptionId,
  } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Scheme Categories" ("id", "Name", "Code", "Description", "Company ID", "Scheme Eligibility Type ID", "Scheme Contribution Option ID","Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        id,
        name,
        code,
        description,
        companyId,
        schemeEligibilityTypeId,
        schemeContributionOptionId,
        created,
        updated,
      ]
    );

    res.status(StatusCodes.OK).json({ schemeCategory: query.rows });
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

const updateSchemeCategory = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    code,
    description,
    companyId,
    schemeEligibilityTypeId,
    schemeContributionOptionId,
  } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Scheme Categories" SET "Name"=($2), "Code"=($3), "Description"=($4),"Company ID"=($5), "Scheme Eligibility Type ID"=($6), "Scheme Contribution Option ID"=($7), "Updated"=($8) WHERE id=($1) RETURNING *`,
      [
        id,
        name,
        code,
        description,
        companyId,
        schemeEligibilityTypeId,
        schemeContributionOptionId,
        updated,
      ]
    );
    res.status(StatusCodes.OK).json({ schemeCategory: query.rows });
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

const deleteSchemeCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Scheme Categories" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ schemeCategory: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllSchemeCategories,
  getSchemeCategory,
  createSchemeCategory,
  updateSchemeCategory,
  deleteSchemeCategory,
};
