const express = require("express");
const router = express.Router();

const {
  getAllResourceActions,
  getResourceAction,
  createResourceAction,
  updateResourceAction,
  deleteResourceAction,
} = require("../controllers/resource_actions");

router.route("/").get(getAllResourceActions).post(createResourceAction);
router
  .route("/:id")
  .get(getResourceAction)
  .put(updateResourceAction)
  .delete(deleteResourceAction);

module.exports = router;
