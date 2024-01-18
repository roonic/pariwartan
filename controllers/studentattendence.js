const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const {StudentAttendance} = require('../models')

const getAllStudentAttendances = async (req, res) => {
  try {
    const { studentId } = req.query;

    const queryObject = {};
    if (studentId) {
      queryObject.student_id = studentId 
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await StudentAttendance.findAll({
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

const updateStudentAttendance = async (req, res) => {
  try {
    const { studentId, today_attendance} = req.body;

    if (!studentId || !today_attendance) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid input parameters' });
    }

    let attendanceRecord = await StudentAttendance.findOne({
      where: { student_id: studentId},
    });

    if (!attendanceRecord) {
      attendanceRecord = await StudentAttendance.create({
        student_id: studentId,
        total: today_attendance,
        present: today_attendance,
      });
    } else {
      total += 1
      present += Number(today_attendance)
      await attendanceRecord.update({ present, total });
    }

    return res.status(StatusCodes.OK).json({ message: 'Student attendance updated successfully' });
  } catch (error) {
    console.error('Error updating student attendance:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = { 
  getAllStudentAttendances,
  updateStudentAttendance
}
