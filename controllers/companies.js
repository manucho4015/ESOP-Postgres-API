const { StatusCodes } = require("http-status-codes");
const db = require("../connect/db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllCompanies = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Companies" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, companies: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Companies" where id=($1)`, [
      id,
    ]);
    res.status(StatusCodes.OK).json({ company: query.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const createCompany = async (req, res) => {
  const { name, accountStatusId, companyGroupId } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Companies" ("id", "Name", "Account Status ID", "Company Group ID", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6) RETURNING *`,
      [id, name, accountStatusId, companyGroupId, created, updated]
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

const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, accountStatusId, companyGroupId } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Companies" SET "Name"=($2), "Account Status ID"=($3), "Company Group ID"=($4), "Updated"=($5) WHERE id=($1) RETURNING *`,
      [id, name, accountStatusId, companyGroupId, updated]
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

const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Companies" where id=($1) RETURNING *`,
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
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
