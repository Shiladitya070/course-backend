const Course = require("../models/Course");

const checkAuthor = async (id, user) => {
  const ogCourse = await Course.findById(id);
  if (ogCourse) {
    const checkUser = ogCourse.author === user;
    // console.log(ogCourse.author, user);
    return checkUser;
  }
};

const CreateCourse = async (req, res) => {
  const { title, description } = req.body;
  const newCourse = new Course({
    title,
    description,
    author: req.user.username,
    created_at: new Date().toISOString(),
  });
  const _res = await newCourse.save();
  res.status(200).json(_res);
};
const getAllCourse = async (req, res) => {
  const allCourses = await Course.find({});
  res.status(200).json(allCourses);
};
const getACourse = async (req, res) => {
  const { id } = req.params;
  try {
    const req_course = await Course.findById({ _id: id });
    if (req_course) {
      return res.status(200).json(req_course);
    } else {
      return res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    return res.status(404).json({ error: "worng id" });
  }
};
const UpdateCourse = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const isTheAuthor = await checkAuthor(id, req.user.username);
  if (isTheAuthor) {
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: id },
      { title: title, description: description }
    );
    if (updatedCourse) {
      return res.status(200).json({ msg: "Course updated" });
    } else {
      return res.status(500).json({ error: "Ma chuda" });
    }
  } else {
    return res.status(403).json({ error: "DENNIED" });
  }
};
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const isTheAuthor = await checkAuthor(id, req.user.username);

  if (isTheAuthor) {
    await Course.findByIdAndDelete(id).then(() => {
      return res.status(200).json({ msg: "delete course" });
    });
  } else {
    return res.status(403).json({ error: "Denied" });
  }
  // return res.status(403).json({ error: "Denied" });
};

module.exports = {
  CreateCourse,
  getACourse,
  getAllCourse,
  UpdateCourse,
  deleteCourse,
};
