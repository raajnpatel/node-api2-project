const express = require('express');
const db = require('../db');

const router = express.Router();


function getPost(id, res){
  return(
    db.findById(id)
      .then(([post]) => {
        console.log(post);
        if(post) {
          res
            .status(201)
            .json(post)
        } else {
          res
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
      })
  )
}

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
      getPost(id, res)
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({error: "There was an error while saving he post to the database."})
    })
});

// **** /api/posts ****



// **** /api/posts/:id ****

router.get(`/:id`, (req, res) => {
  const { id } = req.params;
    getPost(id)
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({error: "The post information could not be retrieved."})
    })
});

router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const {title, contents} = req.body;
  if (!title && !contents) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
  }
  db.update(id,{title, contents})
    .then(updated => {
      if(updated) {
      console.log(updated);
      getPost(id, res)
    } else {
      res
        .status(404)
        .json({message: "The post with the specified ID does not exist"})
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    })

});

router.delete(`/:id`, (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removed => {
      console.log(removed);
      if(removed) {
        res
          .status(204)
          .json({message: "Entry Deleted."})
          .end()
      } else {
        res
          .status(404)
          .json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(error => {
      console.log("delete", error);
      res
        .status(500)
        .json({error: "The post could not be removed."})
    })
});

// **** /api/posts/:id ****



// **** /api/posts/:id/comments ****

router.get(`/:id/comments`, (req, res) => {
  const {id} = req.params;
  db.findById(id)
    .then(([post]) => {
      if (post) {
        db.findPostComments(id)
          .then(comments => {
            res
              .status(200)
              .json(comments)
          })
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
        .json({error: "The comments information could not be retrieved."})
    })

});


// **** /api/posts/:id/comments ****


module.exports = router;
