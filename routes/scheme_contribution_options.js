const express = require("express");
const router = express.Router();

const {
  getAllSchemeContributionOptions,
  getSchemeContributionOption,
  createSchemeContributionOption,
  updateSchemeContributionOption,
  deleteSchemeContributionOption,
} = require("../controllers/shceme_contribution_options");

router
  .route("/")
  .get(getAllSchemeContributionOptions)
  .post(createSchemeContributionOption);
router
  .route("/:id")
  .get(getSchemeContributionOption)
  .put(updateSchemeContributionOption)
  .delete(deleteSchemeContributionOption);

module.exports = router;
