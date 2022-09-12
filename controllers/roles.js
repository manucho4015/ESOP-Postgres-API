const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllRoles = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Roles" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, roles: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Roles" where id=($1)`, [id]);
    res.status(StatusCodes.OK).json({ role: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Roles" ("id", "Name", "Created", "Updated") VALUES ($1,$2, $3, $4) RETURNING *`,
      [id, name, created, updated]
    );

    res.status(StatusCodes.OK).json({ role: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Roles" SET "Name"=($2), "Updated"=($3) WHERE id=($1) RETURNING *`,
      [id, name, updated]
    );
    res.status(StatusCodes.OK).json({ role: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Roles" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ role: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
