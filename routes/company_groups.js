const express = require("express");
const router = express.Router();

const {
  getAllCompanyGroups,
  getCompanyGroup,
  createCompanyGroup,
  updateCompanyGroup,
  deleteCompanyGroup,
} = require("../controllers/company_groups");

router.route("/").get(getAllCompanyGroups).post(createCompanyGroup);
router
  .route("/:id")
  .get(getCompanyGroup)
  .put(updateCompanyGroup)
  .delete(deleteCompanyGroup);

module.exports = router;
