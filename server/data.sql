USE game_tracker;

-- Statuses
INSERT INTO statuses (status_name) VALUES
('Backlog'),
('Playing'),
('Completed'),
('Dropped'),
('100% Completed');

-- Categories
INSERT INTO categories (category) VALUES
('RPG'),
('Action'),
('Adventure'),
('Open World'),
('Shooter'),
('Strategy'),
('Simulation'),
('Survival'),
('Puzzle'),
('Multiplayer'),
('Singleplayer');

-- Games
INSERT INTO games
(title, developer, publisher, is_favorite, rating, notes, launch_year, game_status_id)
VALUES
(
    'The Witcher 3',
    'CD Projekt Red',
    'CD Projekt',
    TRUE,
    10,
    'One of the best RPGs ever made.',
    2015,
    5
),
(
    'Minecraft',
    'Mojang Studios',
    'Xbox Game Studios',
    TRUE,
    9,
    'Relaxing and creative.',
    2011,
    3
),
(
    'Cyberpunk 2077',
    'CD Projekt Red',
    'CD Projekt',
    FALSE,
    8,
    'Much better after updates.',
    2020,
    2
),
(
    'Elden Ring',
    'FromSoftware',
    'Bandai Namco',
    TRUE,
    10,
    'Amazing open-world soulslike.',
    2022,
    3
),
(
    'Portal 2',
    'Valve',
    'Valve',
    FALSE,
    9,
    'Excellent puzzle mechanics.',
    2011,
    1
),
(
    'StarCraft II',
    'Blizzard Entertainment',
    'Blizzard Entertainment',
    FALSE,
    8,
    'Classic RTS experience.',
    2010,
    4
);

-- Game Categories
INSERT INTO game_categories (game_id, category_id) VALUES
-- The Witcher 3
(1, 1), -- RPG
(1, 3), -- Adventure
(1, 4), -- Open World

-- Minecraft
(2, 7), -- Simulation
(2, 8), -- Survival
(2, 10), -- Multiplayer

-- Cyberpunk 2077
(3, 1), -- RPG
(3, 2), -- Action
(3, 4), -- Open World

-- Elden Ring
(4, 1), -- RPG
(4, 2), -- Action
(4, 4), -- Open World

-- Portal 2
(5, 3), -- Adventure
(5, 9), -- Puzzle

-- StarCraft II
(6, 6), -- Strategy
(6, 10); -- Multiplayer

-- Achievements
INSERT INTO achievements
(achievement_number, achievement_text, is_achievement_done, game_id)
VALUES

-- The Witcher 3
(1, 'Finish the main story', TRUE, 1),
(2, 'Complete all Witcher contracts', TRUE, 1),
(3, 'Reach level 50', TRUE, 1),

-- Minecraft
(1, 'Craft a diamond pickaxe', TRUE, 2),
(2, 'Defeat the Ender Dragon', TRUE, 2),
(3, 'Build an automatic farm', FALSE, 2),

-- Cyberpunk 2077
(1, 'Complete the prologue', TRUE, 3),
(2, 'Reach Street Cred 50', FALSE, 3),
(3, 'Buy all apartments', FALSE, 3),

-- Elden Ring
(1, 'Defeat Margit', TRUE, 4),
(2, 'Become Elden Lord', TRUE, 4),
(3, 'Collect all Legendary Armaments', FALSE, 4),

-- Portal 2
(1, 'Escape the facility', FALSE, 5),
(2, 'Complete co-op mode', FALSE, 5),

-- StarCraft II
(1, 'Finish Wings of Liberty campaign', TRUE, 6),
(2, 'Win 50 multiplayer matches', FALSE, 6);