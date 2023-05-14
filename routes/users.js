const router = require("express").Router();
const {
  register,
  login,
  getProfile,
  deleteProfile,
  getUsers,
  deleteUsers,
} = require("../controllers/users");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getProfile/:userId").get(getProfile);
router.route("/deleteProfile/:userId").delete(deleteProfile);
router.route("/getUsers").get(getUsers);
router.route("/deleteUsers").delete(deleteUsers);

module.exports = router;
