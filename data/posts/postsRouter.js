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
        .json({error: "The posts information could not be retrieved."})
    });
});

router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      console.log(post);
      if(post.length) {
        res
          .status(200)
          .json(post)
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({error: "The post information could not be retrieved."})
    })
});

module.exports = router;
