const { StatusCodes } = require("http-status-codes");
const db = require("../connect/heroku_db");
const uniqid = require("uniqid");
const date = require("date-and-time");

const getAllTenants = async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM "Tenants" `);
    res
      .status(StatusCodes.OK)
      .json({ count: query.rows.length, tenants: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const getTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(`SELECT * FROM "Tenants" where id=($1) `, [
      id,
    ]);
    res.status(StatusCodes.OK).json({ tenant: query.rows });
  } catch (error) {
    console.log(error);
  }
};

const createTenant = async (req, res) => {
  const { name, contact, mobileNo, email, postalAddress, location, geoCoords } =
    req.body;

  try {
    const id = uniqid();
    const now = new Date();
    const created = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `INSERT INTO "Tenants" ("id", "Name", "Contact", "Mobile Number", "Email", "Postal Address", "Location", "Geo Co-ordinates", "Created", "Updated") VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        id,
        name,
        contact,
        mobileNo,
        email,
        postalAddress,
        location,
        geoCoords,
        created,
        updated,
      ]
    );

    res.status(StatusCodes.OK).json({ tenant: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { name, contact, mobileNo, email, postalAddress, location, geoCoords } =
    req.body;
  try {
    const now = new Date();
    const updated = date.format(now, "YYYY/MM/DD HH:mm:ss");
    const query = await db.query(
      `UPDATE "Tenants" SET "Name"=($1),"Contact"=($2), "Mobile Number"=($3), "Email"=($4), "Postal Address"=($5), "Location"=($6), "Geo Co-ordinates"=($7), "Updated"=($8) WHERE id=($9) RETURNING *`,
      [
        name,
        contact,
        mobileNo,
        email,
        postalAddress,
        location,
        geoCoords,
        updated,
        id,
      ]
    );
    res.status(StatusCodes.OK).json({ tenant: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await db.query(
      `DELETE FROM "Tenants" where id=($1) RETURNING *`,
      [id]
    );
    res.status(StatusCodes.OK).json({ tenant: query.rows });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Sorry, error occurred in our server" });
  }
};

module.exports = {
  getAllTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
