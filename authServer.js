require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.post('/login', (req, res) => {
  // Authentication User
  
  const username = req.body.username;
  const user = {name: username};

  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET);
  res.json({ accessToken: accessToken});
});

app.listen(4000);