-- Users table seeds here (Example)
INSERT INTO users (name)
VALUES ('Alice'), ('Kira'), ('Daniel'),('Yasmeen'),('Hasan');

INSERT INTO stories (title, content, status, thumbnail_url)
VALUES ('Dracula', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel viverra mauris. Nam sagittis eget elit dapibus sagittis. Morbi augue dolor, fermentum et mollis eu, viverra at ante. Curabitur metus arcu, cursus eget suscipit eget, fermentum ut tortor.', TRUE, '/imgs/Dracula.png'),
('THE GRINGE', 'HE DIED', FALSE, '/imgs/thegrinch.png'),
('Ghost story', 'There was a ghost ', FALSE, '/imgs/ghost.png');

INSERT INTO contributions (suggestion, story_id, user_id, accepted)
VALUES ('and they lived happily ever after', 1, 2, TRUE),
('LOLOLOLOLOL', 1, 3, FALSE),
('He was very scared', 3, 2, TRUE),
('the grinch is having a joyful christmas', 2, 4, TRUE),
('the end', 1, 5, FALSE);

INSERT INTO votes (user_id, story_id, contribution_id, vote)
VALUES (2, 1, 1, TRUE),
(2, 3, 1, FALSE),
(4, 2, 4, TRUE),
(5, 1, 5, TRUE),
(3, 1, 2, FALSE);


