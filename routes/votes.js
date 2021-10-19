const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT COUNT(votes.vote) as vote_count
    FROM votes
    JOIN contributions ON contributions.id = contribution_id
    WHERE contributions.id = 1 AND votes.vote = TRUE;`)
      .then(data => {
        const votes = data.rows;
        res.json(votes);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
