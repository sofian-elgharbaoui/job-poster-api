const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  register,
  getUserInfo,
  updateData,
  deleteUser,
  login,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/:id")
  .get(authMiddleware, getUserInfo)
  .patch(authMiddleware, updateData)
  .delete(authMiddleware, deleteUser);

module.exports = router;
