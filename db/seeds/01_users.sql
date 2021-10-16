-- Users table seeds here (Example)
INSERT INTO users (name, avatar_url, is_author)
VALUES ('Alice', 'http:', TRUE),
('Kira', 'http:', FALSE),
('Daniel', 'http:', FALSE);

INSERT INTO stories (title, content, status, thumbnail_url, author_id)
VALUES ('The Little Mermaid', 'LOTS OF TEXT', TRUE, 'HTTP:', 1),
('THE GRINGE', 'HE DIED', FALSE, 'HTTP:', 1),
('MARRAIGE SUCKS', 'THEY GET MARRIED', TRUE, 'HTTP:', 1);

INSERT INTO contributions (story_id, user_id, accepted)
VALUES (1, 1, TRUE),
(1, 2, FALSE),
(1, 2, FALSE);

INSERT INTO votes (user_id, contribution_id, vote)
VALUES (1, 1, 1),
(2, 1, 1),
(3, 1, 0);
