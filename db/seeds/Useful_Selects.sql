/*
TABLE SHOWS USER THEIR SUGGESTION AND HOW MANY VOTES THEY MADE ON A SPECIFIC CONTRIBUTION

SELECT users.name, contributions.suggestion, count(votes.vote) as vote_count
FROM users
JOIN contributions ON user_id = users.id
JOIN votes ON contribution_id = contributions.id
WHERE votes.vote = TRUE
GROUP BY users.name, contributions.suggestion;

RETURNS THE AMOUNT OF UPVOTES (TRUE) FOR A SPECIFIC CONTRIBUTION:

SELECT votes.story_id, count(votes.contribution_id), votes.vote, contributions.suggestion
FROM votes
JOIN contributions ON contributions.id = contribution_id
WHERE votes.story_id = 1 AND contributions.id = 1
GROUP BY votes.story_id, votes.vote, contributions.suggestion;

 */
