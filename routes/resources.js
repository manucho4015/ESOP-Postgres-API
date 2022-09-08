const express = require("express");
const router = express.Router();

const {
  getAllResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resources");

router.route("/").get(getAllResources).post(createResource);
router
  .route("/:id")
  .get(getResource)
  .put(updateResource)
  .delete(deleteResource);

module.exports = router;
