-- Users table seeds here (Example)
INSERT INTO users (name)
VALUES ('Alice'), ('Kira'), ('Daniel'), ('Yasmeen'), ('Hasan');

INSERT INTO stories (title, content, status, thumbnail_url)
VALUES ('Dracula', 'There once was a vampire, this vampire was named Dracula. He fell in love with a beautify woman named Bella. They married and lived a happy life for years. But Bella did not know Dracula was a vampire (despite his name being Dracula and looking 99% like a vampire). So when she found out she decided she could not be with a vampire so she divorced him. Dracula was not pleased so he...', TRUE, '/imgs/Dracula.png'),
('The Gringe', 'Everyone know about the gringe. He is a mean one, that Mr. Gringe. He is a cuddly as a cactus and bad like a banana! Greasy like the black peel and has garlic for a soul! Honestly with yellow teeth and green fur it is no wonder the Gringe was such a sourpuss. But despite his negative reputation, for some reason this year for Christmas he... ', FALSE, '/imgs/thegrinch.png'),
('Ghost Story', 'Once upon a time there was a ghost. This ghost did not know that it died so it continued to live day to day life as if it were still a living person. The ghost lived like this for years until one day a little boy named Fred realized this ghost was haunting his home! He told his parents and they decided to hire an exorcist. When the exorcist arrived he threw salt everywhere to purify the home but nothing worked becasue the ghost was not evil and did not even realize it was a ghost! A couple months past and finally Fred came up with a solution! In order to put the ghost to rest... ', FALSE, '/imgs/ghost.png');

INSERT INTO contributions (suggestion, story_id, user_id, accepted)
VALUES ('killed Bella because she was a shallow, unfaithful witch!', 1, 2, TRUE),
('let Bella go and married her sister Stella instead.', 1, 3, FALSE),
('was very generous and decided to give all the kids expensive gifts!', 2, 2, FALSE),
('decided he could not bother with disrupting Christmas this year so he slept the season away.', 2, 4, TRUE),
('Fred gave the ghost chocolate and he was so happy his soul was able to find peace.', 3, 5, TRUE),
('every day the family gave offerings to the ghost and prayed for it to pass on. This made the ghost feel bad so it decided to move out and haunt another family.', 3, 4, FALSE);


INSERT INTO votes (user_id, story_id, contribution_id, vote)
VALUES (2, 1, 1, TRUE),
(2, 2, 2, TRUE),
(2, 3, 1, TRUE),
(3, 1, 1, TRUE),
(3, 2, 2, TRUE),
(3, 3, 2, TRUE),
(4, 1, 1, TRUE),
(4, 2, 1, TRUE),
(4, 3, 2, TRUE),
(5, 1, 2, TRUE),
(5, 2, 2, TRUE),
(5, 3, 2, TRUE);


