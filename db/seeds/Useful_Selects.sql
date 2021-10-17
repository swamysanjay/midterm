/*
TABLE SHOWS USER THEIR SUGGESTION AND HOW MANY VOTES THEY MADE ON A SPECIFIC CONTRIBUTION

SELECT users.name, contributions.suggestion, count(votes.vote) as vote_count
FROM users
JOIN contributions ON user_id = users.id
JOIN votes ON contribution_id = contributions.id
WHERE votes.vote = TRUE
GROUP BY users.name, contributions.suggestion;

RETURNS THE AMOUNT OF UPVOTES (TRUE) FOR A SPECIFIC CONTRIBUTION:

SELECT COUNT(votes.vote) as vote_count
FROM votes
JOIN contributions ON contributions.id = contribution_id
WHERE contributions.id = 1 AND votes.vote = TRUE;

/*
