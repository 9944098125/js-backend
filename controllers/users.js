const Users = require("../models/Users");
const bcryptJs = require("bcryptjs");

const register = async (req, res, next) => {
  const { username, email, password, city, bio, photo } = req.body;
  try {
    const salt = bcryptJs.genSaltSync(10);
    const hashedPassword = bcryptJs.hashSync(password, salt);
    const savedUser = await new Users({
      username,
      email,
      password: hashedPassword,
      city,
      bio,
      photo,
    }).save();
    res.status(201).json({
      message: `${savedUser.username}, your account created successfully...`,
      user: savedUser,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const availableUser = await Users.findOne({ email });
    if (!availableUser) {
      return res.status(400).json({
        message: "No User with this email !",
      });
    }
    const isPasswordMatching = await bcryptJs.compare(
      password,
      availableUser.password
    );
    if (!isPasswordMatching) {
      return res.status(402).json({ message: "Wrong Password, please check" });
    } else {
      res.status(200).json({
        message: "Login Success",
        user: {
          _id: availableUser._id,
          username: availableUser.username,
          email: availableUser.email,
          city: availableUser.city,
          bio: availableUser.bio,
          photo: availableUser.photo,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const foundUser = await Users.findOne({ _id: userId });
    res.status(200).json({
      message: "Fetched the user successfully",
      user: foundUser,
    });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json({ message: "Found Users Successfully", users: users });
  } catch (err) {
    next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await Users.findByIdAndDelete(userId);
    res.status(200).json({ message: "Deleted User successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    await Users.deleteMany();
    res.status(200).json({ message: "Deleted Users Successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  deleteProfile,
  getUsers,
  deleteUsers,
};
