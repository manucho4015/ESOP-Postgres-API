const express = require("express");
const router = express.Router();

const {
  getAllShareTransactionTypes,
  getShareTransactionType,
  createShareTransactionType,
  updateShareTransactionType,
  deleteShareTransactionType,
} = require("../controllers/share_transaction_types");

router
  .route("/")
  .get(getAllShareTransactionTypes)
  .post(createShareTransactionType);
router
  .route("/:id")
  .get(getShareTransactionType)
  .put(updateShareTransactionType)
  .delete(deleteShareTransactionType);

module.exports = router;
