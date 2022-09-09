const express = require("express");
const router = express.Router();

const {
  getAllCompanyShares,
  getCompanyShare,
  createCompanyShare,
  updateCompanyShare,
  deleteCompanyShare,
} = require("../controllers/company_shares");

router.route("/").get(getAllCompanyShares).post(createCompanyShare);
router
  .route("/:id")
  .get(getCompanyShare)
  .put(updateCompanyShare)
  .delete(deleteCompanyShare);

module.exports = router;
