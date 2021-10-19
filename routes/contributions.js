/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    //console.log(query);
    db.query(`SELECT contributions.suggestion, users.name, count(votes.vote)
    FROM contributions
    JOIN users ON users.id = user_id
    JOIN votes ON votes.id = contribution_id
    WHERE votes.vote = true
    GROUP BY contributions.suggestion, users.name`)
      .then(data => {
        const contributions = data.rows;
        console.log(contributions)
        res.json(contributions);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
