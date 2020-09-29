require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.post('/token', (req, res) => {
  const refreshToken = req.body.refreshToken;
  if(refreshToken === null) return res.sendStatus(401);
  if(!refreshTokenStock.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
    if(error) return res.sendStatus(403);
    const accessToken = generateAccessToken({name: user.name});
    res.json({ accessToken: accessToken, refreshToken: refreshToken})
  })
})

app.post('/login', (req, res) => {
  // Authentication User
  
  const username = req.body.username;
  const user = {name: username};

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET);
  refreshTokenStock.push(refreshToken);
  
  res.json({ accessToken: accessToken, refreshToken: refreshToken});
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
}

app.listen(4000);