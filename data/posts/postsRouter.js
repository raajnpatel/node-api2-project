const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res
        .status(200)
        .json(posts)
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json("The posts information could not be retrieved.")
    });
});

module.exports = router;
