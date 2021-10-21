/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // api/contributions
  router.get("/", (req, res) => {
    const storyId = req.params.storyId;
    const contributionId = req.params.contributionId;
    db.query(`SELECT votes.story_id, count(votes.contribution_id), votes.vote, contributions.suggestion
    FROM votes
    JOIN contributions ON contributions.id = contribution_id
    WHERE votes.story_id = $1 AND contributions.id = $2
    GROUP BY votes.story_id, votes.vote, contributions.suggestion;`, [storyId, contributionId])
      .then(data => {
        const contributions = data.rows;
        //console.log(contributions)
        res.json(contributions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:storyId", (req, res) => {
    storyId = req.params.storyId;
    db.query(`SELECT contributions.suggestion, contributions.story_id, users.name, count(votes.contribution_id)
    FROM contributions
    JOIN users ON users.id = user_id
    JOIN votes ON votes.id = contribution_id
    WHERE contributions.story_id = $1
    GROUP BY contributions.suggestion, contributions.story_id, users.name, contributions.id
    ORDER BY contributions.id`, [storyId])
      .then(data => {
        const contributions = data.rows;
        console.log("CCCCC: ", contributions[0].count)
        res.json(contributions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/:storyId", (req, res) => {
    const suggestion = req.body.suggestion;
    const storyId = req.params.storyId;
    const userId = req.cookies.user_id;
    db.query(`INSERT INTO contributions(accepted, suggestion, user_id, story_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *`, [false, suggestion, userId, storyId])
      .then(data => {
        const suggest = data.rows;
        console.log(suggest)
        res.json(suggest)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
