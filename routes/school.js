const express = require('express')

const {
  getAllSchools,
  addSchool,
} = require('../controllers/school')

const {
  getAllStudents,
  addStudent,
} = require('../controllers/student')

const {
  getAllTeachers,
  addTeacher,
} = require('../controllers/teacher')

const {
  getAllStudentAttendances,
  updateStudentAttendance
} = require('../controllers/studentattendence')

const { 
  getAllTeacherAttendances, 
  updateTeacherAttendance
} = require('../controllers/teacherattendence')

const router = express.Router()

router.route('/schools').get(getAllSchools).post(addSchool) //need to add authentication for admin
router.route('/students').get(getAllStudents).post(addStudent) //need to add authentication for admin
router.route('/teachers').get(getAllTeachers).post(addTeacher) //need to add authentication for admin
router.route('/teacherattendance').get(getAllTeacherAttendances).put(updateTeacherAttendance)
router.route('/studentattendance').get(getAllStudentAttendances).put(updateStudentAttendance)

module.exports = router

