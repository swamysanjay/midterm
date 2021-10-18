-- Users table seeds here (Example)
INSERT INTO users (name)
VALUES ('Alice', 'Kira', 'Daniel');

INSERT INTO stories (title, content, status, thumbnail_url)
VALUES ('Dracula', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel viverra mauris. Nam sagittis eget elit dapibus sagittis. Morbi augue dolor, fermentum et mollis eu, viverra at ante. Curabitur metus arcu, cursus eget suscipit eget, fermentum ut tortor.', TRUE, 'HTTP:'),
('THE GRINGE', 'HE DIED', FALSE, 'HTTP:'),
('MARRIAGE SUCKS', 'THEY GET MARRIED', TRUE, 'HTTP:');

INSERT INTO contributions (suggestion, story_id, user_id, accepted)
VALUES ('and they lived happily ever after', 1, 2, TRUE),
('LOLOLOLOLOL', 1, 2, FALSE),
('the end', 1, 2, FALSE);

INSERT INTO votes (user_id, story_id, contribution_id, vote)
VALUES (2, 1, 1, TRUE),
(2, 1, 1, FALSE),
(2, 1, 1, FALSE);


