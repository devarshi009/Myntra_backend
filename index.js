const express = require("express");
const { connection } = require("./db");
const { authenticate } = require("./middleware/authenticate.middleware");
const cors = require("cors");
const { userRouter } = require("./routes/User.route");
const {cartRouter}=require("./routes/Cart.route")
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());



app.use("/users", userRouter);
app.use("/cart",cartRouter)
app.use(authenticate);


app.get("/", (req, res) => {
  res.send("Welcome to SignUp");
});
app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log({ err: err });
  }
  console.log("port is running in 5100");
});
