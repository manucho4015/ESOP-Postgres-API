const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllPermissions = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Permissions" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, permissions: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getPermission = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Permissions" where id=($1)`, [
      id,
    ]);
    res.status(StatusCodes.OK).json({ permission: query.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const createPermission = async (req, res) => {
  const { resourceId, resourceActionId, roleId } = req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Permissions" ("id", "Resource ID", "Resource Action ID", "Role ID", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6) RETURNING *`,
      [id, resourceId, resourceActionId, roleId, created, updated]
    );

    res.status(StatusCodes.OK).json({ permission: query.rows });
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

const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { resourceId, resourceActionId, roleId } = req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Permissions" SET "Resource ID"=($2), "Resource Action ID"=($3), "Role ID"=($4), "Updated"=($5) WHERE id=($1) RETURNING *`,
      [id, resourceId, resourceActionId, roleId, updated]
    );
    res.status(StatusCodes.OK).json({ permission: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Permissions" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ permission: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
