require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

const posts = [
  {
    username: 'chihyun',
    title: 'first post!'
  },
  {
    username: 'peter',
    title: 'Second post!'
  }
];

app.get('/posts', authenticationToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

function authenticationToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token === null) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
    if(error) return res.sendStatus(403);
    req.user = user;
    next();
  })
} 

app.listen(3000);