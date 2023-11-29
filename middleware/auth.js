import jwt from "jsonwebtoken";

const authCheck = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(401).json("not authorized please try to log in again");
        } else {
          const userId = decodedToken.id;
          const type = decodedToken.type;
          req.userId = userId;
          req.type = type;
          next();
        }
      });
    } else {
      res.status(401).json("not authorized please try to log in again");
    }
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export default authCheck;
