const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:contributionId", (req, res) => {
    const userId = req.cookies.user_id;
    const contributionId = req.params.contributionId;
    db.query(`INSERT INTO votes (contribution_id, user_id)
    VALUES ($1, $2)
    RETURNING *`, [contributionId, userId])
      .then(data => {
        const votes = data.rows;
        console.log('votes:', votes)
        res.json(votes);
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
