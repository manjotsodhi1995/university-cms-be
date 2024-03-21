const { respondWithJson } = require("../utils/helper");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const httpStatus = require("http-status");

dotenv.config();

module.exports = {
  authenticate: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return respondWithJson(res, httpStatus.UNAUTHORIZED, { error: 'Unauthorized - No token provided' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("user", req.user);
      next();
    } catch (error) {
      return respondWithJson(res, httpStatus.UNAUTHORIZED, { error: 'Unauthorized - Invalid token' });
    }
  }
};

