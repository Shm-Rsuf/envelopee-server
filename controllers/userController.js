const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//generate token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await userModel.findOne({ email });

    //if user is true
    if (exist) {
      return res.status(400).json("email already exist.!");
    }

    //name, email, password is false
    if (!name || !email || !password) {
      return res.status(400).json("All fields are filled");
    }

    //email is not valid
    if (!validator.isEmail(email)) {
      return res.status(400).json("Invalid email");
    }

    //password is not valid
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "Your password is too weak. Please choose a password that is at least 8 characters long and contains a combination of uppercase letters, lowercase letters, numbers, and symbols."
        );
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //create an user
    const user = await userModel.create({ name, email, password: hash });

    //create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id: user._id, name, email, password: user.password, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    //email or password not match
    if (!user) {
      return res.status(400).json("Invalid email or password");
    }

    //comparing password
    const isValidPassword = await bcrypt.compare(password, user.password);
    //invalid password
    if (!isValidPassword) {
      return res.status(400).json("Incorrect password");
    }

    //create token
    const token = await createToken(user._id);
    //send request
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      password: user.password,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { registerUser, loginUser };
