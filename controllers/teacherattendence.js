const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { TeacherAttendance } = require('../models'); // Adjust the path accordingly

const getAllTeacherAttendances = async (req, res) => {
  try {
    const { teacherName, date } = req.query;

    const queryObject = {};
    if (teacherName) {
      queryObject.teacher_name = { [Op.like]: teacherName + '%' };
    }
    if (date) {
      queryObject.date = date;
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
    const { teacherName, date, isPresent } = req.body;

    if (!teacherName || !date || typeof isPresent !== 'boolean') {
      throw new Error('Invalid input parameters');
    }

    const attendanceRecord = await TeacherAttendance.findOne({
      where: { teacher_name: teacherName, date },
    });

    if (!attendanceRecord) {
      // If the record doesn't exist, create a new one
      await TeacherAttendance.create({
        teacher_name: teacherName,
        date,
        is_present: isPresent,
      });
    } else {
      // If the record exists, update the is_present field
      await attendanceRecord.update({ is_present: isPresent });
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
