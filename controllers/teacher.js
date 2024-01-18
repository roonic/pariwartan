const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const { Teacher, School } = require('../models')

const getAllTeachers = async (req, res) => {
  try {
    const { name } = req.query;

    const queryObject = {};
    if (name) {
      queryObject.teacher_name = { [Op.like]: name + '%' };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await Teacher.findAll({
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

const addTeacher = async(req, res) => {
  try {
    const {teacher_name, school_name, subjects} = req.body

    if (!teacher_name && !school_name && !subjects) {
      console.log(error)
    }
    let school = await School.findOne({
      where: {
	school_name: school_name
      },
      attributes: ['school_id']
    })
    let school_id = school.school_id
    const queryObject = {
      ...req.body,
      school_id
    }

    const result = await Teacher.create({...queryObject})
    res.status(StatusCodes.CREATED).json({result})
  }
  catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
  }
}

module.exports = { addTeacher, getAllTeachers }

