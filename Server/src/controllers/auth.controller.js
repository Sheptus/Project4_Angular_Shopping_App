/* -------------------------------------------------------------------------- */
/*                               Auth Controller                              */
/* -------------------------------------------------------------------------- */

const User = require("../models/User");
const { getJwt } = require("../utils/createJwt");
const { hashPwd, compareHashPwd } = require("../utils/hashPwd");
const { verifyJwt } = require("../utils/verifyToken");

/* ---------------------------- User Verification --------------------------- */
exports.verifyUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.find({ email: username }).select("-password");
    if (user.length) {
      return res.status(422).json({ exist: true });
    }
    res.status(200).json({ exist: false });
  } catch (e) {
    res.status(400).json(e);
  }
};
/* --------------------------- User Authorization --------------------------- */
exports.verifyAuth = async (req, res, next) => {
  // const bearer = req.headers.authorization;
  // console.log('bearer = ', bearer);
  // if (!bearer || !bearer.startsWith('Bearer ')) {
  // 	return res.status(401).end();
  // }

  // const token = bearer.split('Bearer ')[1].trim();
  // console.log('token = ', token);
  const token = req.headers.authorization;
  let payload;
  try {
    payload = await verifyJwt(token);
  } catch (e) {
    return res.status(401).end();
  }
  console.log("payload = ", payload);
  const user = await User.find({ email: payload.email }).select("-password");
  console.log("user = ", user);
  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

/* ------------------------------ User Register ----------------------------- */
exports.register = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "need name and password" });
  }

  try {
    const hashedPwd = await hashPwd(password);
    const user = await User.create({ ...req.body, password: hashedPwd });
    return res.status(201).json({ msg: "user created", user });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

/* ------------------------------- User Login ------------------------------- */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const invalid = { message: "invalid email password combination" };

  try {
    console.log("login");
    const user = await User.findOne({ email }).select("name password role");

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await compareHashPwd(password, user.password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    const token = await getJwt({ role: user.role, name: user.name });
    return res.status(200).json({
      token,
      user: { name: user.name, _id: user._id, role: user.role },
    });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};

exports.getLoggedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id }).select("-password");
    res.status(200).json(user);
  } catch (e) {
    res.status(401).json(e);
  }
};
