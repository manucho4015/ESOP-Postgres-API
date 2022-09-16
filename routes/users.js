const express = require("express");
const router = express.Router();

const authenticationMiddleware = require("../middleware/authenticator");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.route("/").get(authenticationMiddleware, getAllUsers).post(createUser);
router
  .route("/:id")
  .get(authenticationMiddleware, getUser)
  .put(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser);

module.exports = router;
