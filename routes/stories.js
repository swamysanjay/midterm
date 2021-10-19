const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /api/stories
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM stories`)
      .then(data => {
        const stories = data.rows;
        //console.log('stories:', stories);
        res.json(stories);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:storyId/contributions", (req, res) => {
    const storyId=req.params.storyId;
    db.query(`SELECT contributions.suggestion, contributions.story_id, users.name, count(votes.vote)
    FROM contributions
    JOIN users ON users.id = user_id
    JOIN votes ON votes.id = contribution_id
    WHERE contributions.story_id = $1
    GROUP BY contributions.suggestion, contributions.story_id, users.name`,[storyId])
      .then(data => {
        const contributions = data.rows;
        console.log(contributions)
        res.json(contributions);
      })
  })
  return router;
};


