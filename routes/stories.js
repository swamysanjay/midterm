const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //const something = data.row
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
  router.put("/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    const suggestion = req.body.suggestion;
    console.log('suggest:', suggestion)
    db.query(`SELECT * FROM stories WHERE id = $1`, [storyId])
      .then(data => {
        const story = data.rows[0];
        console.log('story:', story);
          db.query(`UPDATE stories
        SET content = $1
        WHERE id = $2`, [story.content + " " + suggestion, storyId])
        res.json(story);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //LINKS with renderStories ajax GET request in app.js
  router.get("/:storyId/contributions", (req, res) => {
    const storyId = req.params.storyId;
    db.query(`
    SELECT contribution_id, contributions.id, users.name, contributions.suggestion, COUNT (contribution_id) as vote
    FROM contributions
    JOIN users ON users.id = user_id
    LEFT JOIN votes ON contributions.id = votes.contribution_id
    WHERE contributions.story_id = $1
    GROUP BY contribution_id, contributions.id, users.name, contributions.suggestion`,[storyId])
      .then(data => {
        const contributions = data.rows;
        console.log("contributions:", contributions)
        res.json(contributions);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({error: err.message});
      })
  })
  return router;
};
