require("dotenv").config();
const jwt = require("jsonwebtoken");
const APP_SECRET = process.env.APP_SECRET;

const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  return alert("Not authenticated");
};

module.exports = {
  APP_SECRET,
  getUserId,
};
