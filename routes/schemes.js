const express = require("express");
const router = express.Router();

const {
  getAllSchemes,
  getScheme,
  createScheme,
  updateScheme,
  deleteScheme,
} = require("../controllers/schemes");

router.route("/").get(getAllSchemes).post(createScheme);
router.route("/:id").get(getScheme).put(updateScheme).delete(deleteScheme);

module.exports = router;
