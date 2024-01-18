const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { TeacherAttendance } = require('../models'); // Adjust the path accordingly

const getAllTeacherAttendances = async (req, res) => {
  try {
    const { teacherId, } = req.query;

    const queryObject = {};
    if (teacherId) {
      queryObject.teacher_id = teacherId 
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await TeacherAttendance.findAll({
      where: queryObject,
      offset: skip,
      limit: limit,
    });

    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const updateTeacherAttendance = async (req, res) => {
  try {
    const { teacherId, today_attendance} = req.body;

    if (!teacherId || !today_attendance) {
      throw new Error('Invalid input parameters');
    }

    const attendanceRecord = await TeacherAttendance.findOne({
      where: { teacher_id: teacherId},
    });
    console.log(attendanceRecord.total)
    if (!attendanceRecord) {
      // If the record doesn't exist, create a new one
      await TeacherAttendance.create({
        teacher_id: teacherId,
        total,
        present,
      });
    } else {
      // If the record exists, update the is_present field
      attendanceRecord.total += 1
      attendanceRecord.present += Number(today_attendance)
      await attendanceRecord.update({ present: attendanceRecord.present, total: attendanceRecord.total});
    }

    res.status(StatusCodes.OK).json({ message: 'Teacher attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = {
  getAllTeacherAttendances,
  updateTeacherAttendance,
};
