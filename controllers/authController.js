import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 3600 });
}

export const login = (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({
    where: {
      [Op.or]: [{ name: name }, { email: email }],
    },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const token = createToken(user.id);
            res.cookie("jwt", token, {
              maxAge: 1000 * 3600,
              sameSite: "none",
              secure: true,
            });
            res.status(201).json({ userId: user.id });
          } else {
            res.status(500).json({ message: "incorrect password" });
          }
        });
      } else {
        res.status(401).json({ message: "invalid e-mail" });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};
export async function signup(req, res) {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    profile_picture: req.files[0].filename,
  };
  newUser.id = uuidv4();
  // password hashing
  const salt = await bcrypt.genSalt();
  newUser.password = await bcrypt.hash(newUser.password, salt);
  User.create(newUser)
    .then(() => {
      const token = createToken(newUser.id);
      res.cookie("jwt", token, {
        maxAge: 1000 * 3600,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({ userId: newUser.id });
    })
    .catch((e) => {
      let message = e.errors[0].message;
      res.status(400).json(message);
    });
}
export const logout = (req, res) => {
  res.clearCookie("jwt", {
    sameSite: "none",
    secure: true,
  });
  res.send("Logged out successfully");
};
