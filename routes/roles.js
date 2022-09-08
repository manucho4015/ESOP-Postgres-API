const express = require("express");
const router = express.Router();

const {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles");

router.route("/").get(getAllRoles).post(createRole);
router.route("/:id").get(getRole).put(updateRole).delete(deleteRole);

module.exports = router;
