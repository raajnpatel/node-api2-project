const express = require('express');
const db = require('../db');

const router = express.Router();


// function getPost(id, res){
//   return(
//     db.findById(id)
//       .then(([post]) => {
//         console.log(post);
//         if(post) {
//           res
//             .status(201)
//             .json(post)
//         } else {
//           res
//             .status(404)
//             .json({message: "The post with the specified ID does not exist."})
//         }
//       })
//   )
// }

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

router.get('/:post_id/comments', (req, res) => {
  const { post_id } = req.params;
  db.findById(post_id)
    .then(([post]) => {
      console.log(post);
      if(post){
        db.findPostComments(post_id)
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

router.post('/:post_id/comments', (req, res) => {
  const {post_id} = req.params;
  const {text} = req.body;
  db.insertComment({text, post_id})
    .then(({id: comment_id}) => {
      console.log(comment_id);
      db.findCommentById(comment_id)
        .then(([comment]) => {
          if (comment) {
            res
              .status(200)
              .json(comment)
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
    })
});


// router.post('/:post_id/comments', (req, res) => {
//   const {post_id} = req.params;
//   const {text} = req.body;
//   if (text === "" || typeof text !== "string") {
//     return (
//       res
//         .status(400)
//         .json({errorMessage: "Please provide text for the comment."})
//     )
//   }
//
//   db.insertComment({text, post_id})
//     .then(({id: comment_id}) => {
//       console.log(comment_id);
//       if (comment_id) {
//         res
//           .status(200)
//           .json(comment_id)
//       } else {
//         res
//           .status(404)
//           .json({message: "The post with the specified ID does not exist."})
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       res
//         .status(500)
//         .json({error: "There was an error while saving the comment to the database."})
//     })
// });

// **** /api/posts/:id/comments ****


module.exports = router;
