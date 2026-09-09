import jwt from "jsonwebtoken";
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Please authenticate using a valid token ");
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).send("Please authenticate using a valid token");
    }
  }
};
export default fetchUser;
