const express = require("express");
const router = express.Router();

const {
  getAllSchemeEligibilityTypes,
  getSchemeEligibilityType,
  createSchemeEligibilityType,
  updateSchemeEligibilityType,
  deleteSchemeEligibilityType,
} = require("../controllers/scheme_eligibility_types");

router
  .route("/")
  .get(getAllSchemeEligibilityTypes)
  .post(createSchemeEligibilityType);
router
  .route("/:id")
  .get(getSchemeEligibilityType)
  .put(updateSchemeEligibilityType)
  .delete(deleteSchemeEligibilityType);

module.exports = router;
