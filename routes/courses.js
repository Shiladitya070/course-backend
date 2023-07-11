const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/check-auth");
const {
  getAllCourse,
  CreateCourse,
  getACourse,
  UpdateCourse,
  deleteCourse,
} = require("../controllers/Courses");

router.route("/", auth).get(getAllCourse).post(auth, CreateCourse);
router
  .route("/:id")
  .patch(auth, UpdateCourse)
  .delete(auth, deleteCourse)
  .get(getACourse);
module.exports = router;
