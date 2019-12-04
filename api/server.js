const express = require('express');
const postsRouter = require('../data/posts/postsRouter');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(`/api/posts`, postsRouter);
server.use(cors());

module.exports = server;
