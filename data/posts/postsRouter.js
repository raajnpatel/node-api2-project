const express = require('express');
const db = require('../db');

const router = express.Router();


// **** /api/posts ****

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

router.post('/', (req, res) => {
  const {title, contents} = req.body;
  if (!title || !contents) {
    return res
      .status(400)
      .json({errorMessage: "Please provide title and contents for the post."})
  }
  db.insert({title, contents})
    .then(({id}) => {
      db.findById(id)
        .then(([post]) => {
          console.log(post);
          res
            .status(201)
            .json(post)
        })
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({error: "There was an error while savint he post to the database."})
    })
});

// **** /api/posts ****


router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(([post]) => {
      console.log(post);
      if(post) {
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
