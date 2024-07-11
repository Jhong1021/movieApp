const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
};
