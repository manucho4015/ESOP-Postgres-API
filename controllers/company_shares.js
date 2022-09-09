const { StatusCodes } = require("http-status-codes");
const db = require("../connect/db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllCompanyShares = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Company Shares" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, companyShares: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyShare = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `SELECT * FROM "Company Shares" where id=($1)`,
      [id]
    );
    res.status(StatusCodes.OK).json({ companyShare: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createCompanyShare = async (req, res) => {
  const { name, companyId, currentBalanceDerived } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Company Shares" ("id", "Name", "Company ID", "Current Balance Derived", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6) RETURNING *`,
      [id, name, companyId, currentBalanceDerived, created, updated]
    );

    res.status(StatusCodes.OK).json({ companyShare: query.rows });
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

const updateCompanyShare = async (req, res) => {
  const { id } = req.params;
  const { name, companyId, currentBalanceDerived } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Company Shares" SET "Name"=($2), "Company ID"=($3), "Current Balance Derived"=($4), "Updated"=($5) WHERE id=($1) RETURNING *`,
      [id, name, companyId, currentBalanceDerived, updated]
    );
    res.status(StatusCodes.OK).json({ companyShare: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteCompanyShare = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Company Shares" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ companyShare: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllCompanyShares,
  getCompanyShare,
  createCompanyShare,
  updateCompanyShare,
  deleteCompanyShare,
};
