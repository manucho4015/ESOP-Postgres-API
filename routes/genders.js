const express = require("express");
const router = express.Router();

const {
  getAllGenders,
  getGender,
  createGender,
  updateGender,
  deleteGender,
} = require("../controllers/genders");

router.route("/").get(getAllGenders).post(createGender);
router.route("/:id").get(getGender).put(updateGender).delete(deleteGender);

module.exports = router;
