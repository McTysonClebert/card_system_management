import jwt from "jsonwebtoken";

const authMiddleWare = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error verifying token: ${error.message}`);
  }
};

export { authMiddleWare };
