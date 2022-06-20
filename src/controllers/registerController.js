const TeacherModel = require("../models/teacherModel");
const bcrypt = require("bcrypt");
require('dotenv').config();

/*NOWA METODA REJESTRACJI*/
const handleRegistration = async (req, res) => {
  //const {teacherName, teacherEmail, teacherPassword} = req.body;
  console.log(req.body);

  if (!req.body.userName || !req.body.email || !req.body.password) return res.status(400).json({ 'message': 'Username, e-mail and password are required.' });

  const ifTeacherNameDuplicate = await TeacherModel.findOne({ userName: req.body.userName }).exec();
  if (ifTeacherNameDuplicate) return res.sendStatus(409); //Conflict

  try {
    //const hashedTeacherPassword = await bcrypt.hash(teacherPassword, 10);

    const newTeacher = TeacherModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    });
    newTeacher.save();

    res.status(201).json({ 'success': `New teacher ${req.body.userName} created!` });

  } catch (error) {
    res.status(500).json({ 'message_error': error.message });
  }  
}

module.exports = { handleRegistration };