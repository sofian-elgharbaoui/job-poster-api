const express = require("express");
const router = express.Router();

const {
  register,
  getUserInfo,
  updateData,
  deleteUser,
  login,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:id").get(getUserInfo).patch(updateData).delete(deleteUser);

module.exports = router;
