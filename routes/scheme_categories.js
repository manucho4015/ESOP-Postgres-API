const express = require("express");
const router = express.Router();

const {
  getAllSchemeCategories,
  getSchemeCategory,
  createSchemeCategory,
  updateSchemeCategory,
  deleteSchemeCategory,
} = require("../controllers/scheme_categories");

router.route("/").get(getAllSchemeCategories).post(createSchemeCategory);
router
  .route("/:id")
  .get(getSchemeCategory)
  .put(updateSchemeCategory)
  .delete(deleteSchemeCategory);

module.exports = router;
