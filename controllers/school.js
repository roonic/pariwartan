const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const { School } = require('../models')

const getAllSchools = async (req, res) => {
  try {
    const { schoolName } = req.query;

    const queryObject = {};
    if (schoolName) {
      queryObject.school_name = { [Op.like]: schoolName + '%' };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await School.findAll({
      where: queryObject,
      offset: skip,
      limit: limit,
    });

    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  }
};

const addSchool = async(req, res) => {
  try {
    const { school_name, location, email, phone_no } = req.body

    if (!school_name && !location && !email && !phone_no) {
      console.log("Give All")
    }
    console.log(school_name)
    const result = await School.create({...req.body})
    res.status(StatusCodes.CREATED).json({result})
  }
  catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
  }
}
module.exports = { 
  addSchool,
  getAllSchools 
}
