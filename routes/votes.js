const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:storyId/:contributionId", (req, res) => {
    const storyId = req.params.storyId;
    const contributionId = req.params.contributionId;
    db.query(`SELECT votes.story_id, count(votes.contribution_id), votes.vote, contributions.suggestion
    FROM votes
    JOIN contributions ON contributions.id = contribution_id
    WHERE votes.story_id = $1 AND contributions.id = $2
    GROUP BY votes.story_id, votes.vote, contributions.suggestion;`, [storyId, contributionId])
      .then(data => {
        const contribution = data.rows;
        console.log('votes:', contribution[0].count)
        res.json(contribution);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.post("/:storyId", (req, res) => {
  //   // const vote = req.body.vote;
  //   // const storyId = req.params.storyId;
  //   // const userId = req.cookies.user_id;
  //   // const contributionId =
  //   // db.query(`INSERT INTO votes (contribution_id, story_id, user_id, vote)
  //   // VALUES ($1, $2, $3, $4)
  //   // RETURNING *`, [contributionId, storyId, userId, vote])
  //   //   .then(data => {
  //   //     const vote = data.rows;
  //   //     console.log(vote)
  //   //     res.json(vote)
  //   //   })
  //   //   .catch(err => {
  //   //     res
  //   //       .status(500)
  //   //       .json({ error: err.message });
  //   //   });
  // });
   return router;
};
