const TeacherModel = require("../models/teacherModel");
const AppError = require("../helpers/AppError");
const bcrypt = require("bcrypt");
const { USER_ERROR } = require("../helpers/errorCodes");
const { USER_NOT_FOUND, USER_MISSING_PASSWORD, USER_UNAUTHORIZED, USER_FORBIDDEN } = require("../helpers/errorMessages");
const { USER_DELETED, USER_ACCOUNT_VERIFIED, USER_PASSWORD_MODIFY } = require("../helpers/confirmationMessages");
const { tryCatch } = require("../helpers/tryCatch");

const teacherGetAll = tryCatch(async (req, res) => {
  const user = await TeacherModel.find();

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;
  return res.status(200).json(res.user);
});

const userGetByUsername = tryCatch(async (req, res) => {
  const user = await TeacherModel.findOne({userName: req.params.username});

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;
  return res.status(200).json(res.user);
});

const userPatchByUsername = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt){
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = await TeacherModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    throw new AppError(USER_ERROR, USER_FORBIDDEN, 403);
  }

  const user = await TeacherModel.findOne({userName: req.params.username});
  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  if (req.params.username != foundUser.userName) {
    throw new AppError(USER_ERROR, USER_UNAUTHORIZED, 401);
  }

  res.user = user;
  const hashedUserPassword = await bcrypt.hash(req.body.password, 10);
  
  if (req.body.password != null) {
    res.user.password = hashedUserPassword;
  } else {
    throw new AppError(USER_ERROR, USER_MISSING_PASSWORD, 400);
  }
  
  await res.user.save();
  return res.status(200).json({message: USER_PASSWORD_MODIFY});
});

const userDeleteByUsername = tryCatch(async (req, res) => {
  const user = await TeacherModel.findOne({userName: req.params.username})
  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  res.user = user;

  await TeacherModel.deleteOne({userName: res.user.userName});
  return res.status(200).json({message: USER_DELETED});
});

const userVerifyAfterRegistration = tryCatch(async (req, res) => {
  const user = await TeacherModel.findOne({userName: req.params.username});
  res.user = user;

  if (user == null) {
    throw new AppError(USER_ERROR, USER_NOT_FOUND, 404);
  }

  user.verification = true;

  await res.user.save();
  return res.status(200).json({message: USER_ACCOUNT_VERIFIED});
});

module.exports = { 
  teacherGetAll,
  userGetByUsername,
  userPatchByUsername,
  userDeleteByUsername,
  userVerifyAfterRegistration
};