const express = require("express");
const router = express.Router();

const {
  getAllTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
} = require("../controllers/tenants");

router.route("/").get(getAllTenants).post(createTenant);
router.route("/:id").get(getTenant).put(updateTenant).delete(deleteTenant);

module.exports = router;
