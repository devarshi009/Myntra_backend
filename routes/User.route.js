require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const cors=require("cors")
const { UserModel } = require("../model/User.model");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    // get all the users
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    console.log({ msg: "something is fissy!", err: err });
  }
});

/*
let obj = {
    name: "Devarshi",
    age: 12
}
1. -> console.log(obj.name)
2. -> console.log(obj[name])
3. ->


const {name, age} = obj

*/

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: hash,
        });
        await user.save();
        res.send({ msg: "Reagistartion successfull" });
      }
    });
  } catch (err) {
    console.log({ msg: "something is fissy!", err: err });
    res.send({ msg: "registartion faulty!" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          console.log({ msg: "Logged In successfully", token: token });
          res.send({ msg: "Logged In successfully", token: token });
        } else {
          res.send({ msg: "Password is wrong" });
        }
      });
    } else {
      res.send({ msg: "signup first !" });
    }
  } catch (err) {
    console.log({ msg: "something is fissy!", err: err });
    res.send({ msg: "something is fissy!", err: err })
  }
});

module.exports = { userRouter };
