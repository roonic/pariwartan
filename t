const { StatusCodes } = require('http-status-codes')


const getAllStudentAttendance = async (req, res) => {
  try {
    const { studentName, date } = req.query;

    const queryObject = {};
    if (studentName) {
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

const updateStudentAttendance = async (req, res) => {
  try {
    const { studentId, date, isPresent } = req.body;

    if (!studentId || !date || typeof isPresent !== 'boolean') {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid input parameters' });
    }

    let attendanceRecord = await StudentAttendance.findOne({
      where: { student_id: studentId, date },
    });

    if (!attendanceRecord) {
      attendanceRecord = await StudentAttendance.create({
        student_id: studentId,
        date,
        is_present: isPresent,
      });
    } else {
      await attendanceRecord.update({ is_present: isPresent });
    }

    return res.status(StatusCodes.OK).json({ message: 'Student attendance updated successfully' });
  } catch (error) {
    console.error('Error updating student attendance:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = { 
  getAllStudentAttendance,
  updateStudentAttendance
}
