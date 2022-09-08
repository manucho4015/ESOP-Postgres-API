const express = require("express");
const router = express.Router();

const {
  getAllAccountStatuses,
  getAccountStatus,
  createAccountStatus,
  updateAccountStatus,
  deleteAccountStatus,
} = require("../controllers/account_statuses");

router.route("/").get(getAllAccountStatuses).post(createAccountStatus);
router
  .route("/:id")
  .get(getAccountStatus)
  .put(updateAccountStatus)
  .delete(deleteAccountStatus);

module.exports = router;
