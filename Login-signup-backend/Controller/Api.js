const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "authflow_secret_key";

let arr = []; // in-memory "database"

const register = (req, res) => {
  const data = req.body;
  const account = arr.find((item) => item.email === data.email);
  if (account) {
    return res.send({ msg: "This email already exists" });
  }
  const hashedPass = bcrypt.hashSync(data.password, saltRound);
  const user = { name: data.name, email: data.email, password: hashedPass };
  arr.push(user);
  const token = jwt.sign({ user: user.email }, secretKey);
  res.send({ msg: "User registered successfully", token, name: user.name });
};

const login = async (req, res) => {
  const data = req.body;
  const account = arr.find((item) => item.email === data.email);
  if (!account) {
    return res.send({ msg: "User is not registered" });
  }
  const match = await bcrypt.compare(data.password, account.password);
  if (match) {
    const token = jwt.sign({ user: data.email }, secretKey, { expiresIn: "365d" });
    return res.send({ msg: "User logged in successfully", token, name: account.name });
  } else {
    return res.send({ msg: "Incorrect password" });
  }
};

const home = (req, res) => {
  res.send({ message: "This is the Home page" });
};

const dashboard = (req, res) => {
  res.send({ msg: "Welcome to Dashboard" });
};

module.exports = { login, register, home, dashboard };
