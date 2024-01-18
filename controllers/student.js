const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const { Student, School } = require('../models')

const getAllStudents = async(req, res) => {
  try {
    const { name } = req.query
    const queryObject = {}

    if (name) {
      queryObject.student_name = {[Op.like]: name + '%'}
    }
    
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    let result = await Student.findAll({
      where: queryObject,
      offset: skip,
      limit: limit
    })

    res.status(StatusCodes.OK).json({result})
  }
  catch(err) {
      console.log(err)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err})
  }
}

const addStudent = async(req, res) => {
  try {
    const { student_name, grade, age, gender, roll, school_name } = req.body

    if (!student_name && !grade && !age && !roll && !school_name) {
      throw new BadRequestError('404')
    }

    let school = await School.findOne({
      where: {
	school_name: school_name
      },
      attributes: ['school_id']
    })
    let school_id = school.school_id
    const queryObject = {
      school_id,
      grade,
      gender,
      roll,
      age,
      student_name,
    }
    const result = await Student.create({...queryObject})
    res.status(StatusCodes.CREATED).json({result})
  }
  catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
  }
}

module.exports = {
  getAllStudents,
  addStudent,
}



