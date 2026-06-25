USE game_tracker;

-- Statuses
INSERT INTO statuses (status_name) VALUES
('Backlog'),
('Playing'),
('Completed'),
('Dropped'),
('100% Completed'),
('Wishlist'),
('Paused');

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
('Singleplayer'),
('Platformer'),
('Racing'),
('Horror'),
('Indie'),
('Metroidvania'),
('Roguelike'),
('Sports'),
('Fighting'),
('Stealth');

-- Games
INSERT INTO games
(title, developer, publisher, is_favorite, rating, notes, launch_year, game_status_id)
VALUES
('The Witcher 3', 'CD Projekt Red', 'CD Projekt', TRUE, 10, 'One of the best RPGs ever made.', 2015, 5),
('Minecraft', 'Mojang Studios', 'Xbox Game Studios', TRUE, 9, 'Relaxing and creative.', 2011, 3),
('Cyberpunk 2077', 'CD Projekt Red', 'CD Projekt', FALSE, 8, 'Much better after updates.', 2020, 2),
('Elden Ring', 'FromSoftware', 'Bandai Namco', TRUE, 10, 'Amazing open-world soulslike.', 2022, 3),
('Portal 2', 'Valve', 'Valve', FALSE, 9, 'Excellent puzzle mechanics.', 2011, 1),
('StarCraft II', 'Blizzard Entertainment', 'Blizzard Entertainment', FALSE, 8, 'Classic RTS experience.', 2010, 4),

('Hollow Knight', 'Team Cherry', 'Team Cherry', TRUE, 10, 'Beautiful metroidvania with great atmosphere.', 2017, 5),
('Stardew Valley', 'ConcernedApe', 'ConcernedApe', TRUE, 9, 'Cozy farming and life simulator.', 2016, 2),
('Terraria', 'Re-Logic', 'Re-Logic', FALSE, 9, 'Lots of exploration and crafting.', 2011, 1),
('Doom Eternal', 'id Software', 'Bethesda Softworks', FALSE, 8, 'Fast and intense shooter.', 2020, 3),
('Celeste', 'Maddy Makes Games', 'Maddy Makes Games', TRUE, 9, 'Challenging platformer with a strong story.', 2018, 5),
('Resident Evil 4 Remake', 'Capcom', 'Capcom', FALSE, 9, 'Excellent action horror remake.', 2023, 2),
('Forza Horizon 5', 'Playground Games', 'Xbox Game Studios', FALSE, 8, 'Open world racing with great visuals.', 2021, 1),
('Hades', 'Supergiant Games', 'Supergiant Games', TRUE, 9, 'Addictive roguelike combat and storytelling.', 2020, 3),
('Civilization VI', 'Firaxis Games', '2K', FALSE, 8, 'Deep strategy game with long campaigns.', 2016, 7),
('The Legend of Zelda: Breath of the Wild', 'Nintendo', 'Nintendo', TRUE, 10, 'Exploration-focused open world adventure.', 2017, 3),
('God of War', 'Santa Monica Studio', 'Sony Interactive Entertainment', TRUE, 9, 'Strong story and combat.', 2018, 3),
('Red Dead Redemption 2', 'Rockstar Games', 'Rockstar Games', TRUE, 10, 'Immersive western open world.', 2018, 2),
('Among Us', 'Innersloth', 'Innersloth', FALSE, 7, 'Fun social deduction game with friends.', 2018, 1),
('Slay the Spire', 'Mega Crit', 'Mega Crit', FALSE, 9, 'Great deckbuilding roguelike.', 2019, 2),

('Dark Souls III', 'FromSoftware', 'Bandai Namco', TRUE, 9, 'Challenging action RPG with excellent boss fights.', 2016, 3),
('Sekiro: Shadows Die Twice', 'FromSoftware', 'Activision', TRUE, 10, 'Precise combat and very rewarding progression.', 2019, 5),
('Baldur''s Gate 3', 'Larian Studios', 'Larian Studios', TRUE, 10, 'Deep role-playing with excellent choices and characters.', 2023, 2),
('Mass Effect Legendary Edition', 'BioWare', 'Electronic Arts', FALSE, 9, 'Great sci-fi RPG trilogy remaster.', 2021, 1),
('Skyrim', 'Bethesda Game Studios', 'Bethesda Softworks', TRUE, 9, 'Classic open-world fantasy RPG.', 2011, 3),
('Fallout: New Vegas', 'Obsidian Entertainment', 'Bethesda Softworks', TRUE, 9, 'Excellent role-playing and quest design.', 2010, 3),
('The Last of Us Part I', 'Naughty Dog', 'Sony Interactive Entertainment', FALSE, 9, 'Story-focused action adventure.', 2022, 1),
('Uncharted 4', 'Naughty Dog', 'Sony Interactive Entertainment', FALSE, 8, 'Cinematic adventure with great set pieces.', 2016, 3),
('Spider-Man Remastered', 'Insomniac Games', 'Sony Interactive Entertainment', TRUE, 9, 'Fun traversal and superhero combat.', 2018, 3),
('Batman: Arkham Knight', 'Rocksteady Studios', 'Warner Bros. Games', FALSE, 8, 'Strong action stealth superhero game.', 2015, 2),

('Ori and the Will of the Wisps', 'Moon Studios', 'Xbox Game Studios', TRUE, 9, 'Beautiful platforming and emotional story.', 2020, 3),
('Dead Cells', 'Motion Twin', 'Motion Twin', FALSE, 9, 'Fast roguelike action platformer.', 2018, 2),
('Cuphead', 'Studio MDHR', 'Studio MDHR', FALSE, 8, 'Difficult boss rush with unique art style.', 2017, 1),
('It Takes Two', 'Hazelight Studios', 'Electronic Arts', TRUE, 9, 'Excellent co-op adventure.', 2021, 3),
('Overcooked 2', 'Team17', 'Team17', FALSE, 8, 'Chaotic multiplayer cooking game.', 2018, 1),
('Rocket League', 'Psyonix', 'Epic Games', FALSE, 8, 'Competitive car football.', 2015, 2),
('FIFA 23', 'EA Vancouver', 'Electronic Arts', FALSE, 7, 'Football sports game.', 2022, 4),
('NBA 2K24', 'Visual Concepts', '2K', FALSE, 6, 'Basketball sports simulation.', 2023, 1),
('Mortal Kombat 11', 'NetherRealm Studios', 'Warner Bros. Games', FALSE, 8, 'Brutal fighting game with cinematic story.', 2019, 3),
('Street Fighter 6', 'Capcom', 'Capcom', TRUE, 9, 'Polished modern fighting game.', 2023, 2),

('Cities: Skylines', 'Colossal Order', 'Paradox Interactive', FALSE, 8, 'Detailed city builder.', 2015, 3),
('The Sims 4', 'Maxis', 'Electronic Arts', FALSE, 7, 'Life simulation sandbox.', 2014, 1),
('Planet Zoo', 'Frontier Developments', 'Frontier Developments', FALSE, 8, 'Zoo management simulation.', 2019, 1),
('Factorio', 'Wube Software', 'Wube Software', TRUE, 10, 'Factory automation masterpiece.', 2020, 2),
('RimWorld', 'Ludeon Studios', 'Ludeon Studios', TRUE, 9, 'Colony sim with emergent stories.', 2018, 2),
('Subnautica', 'Unknown Worlds Entertainment', 'Unknown Worlds Entertainment', TRUE, 9, 'Underwater survival exploration.', 2018, 3),
('The Forest', 'Endnight Games', 'Endnight Games', FALSE, 8, 'Survival horror crafting game.', 2018, 1),
('Phasmophobia', 'Kinetic Games', 'Kinetic Games', FALSE, 8, 'Co-op ghost hunting horror.', 2020, 2),
('Alan Wake 2', 'Remedy Entertainment', 'Epic Games Publishing', TRUE, 9, 'Stylish survival horror narrative.', 2023, 2),
('Control', 'Remedy Entertainment', '505 Games', FALSE, 8, 'Strange action adventure with great powers.', 2019, 3);
-- Game Categories
INSERT INTO game_categories (game_id, category_id) VALUES
-- The Witcher 3
(1, 1), (1, 3), (1, 4), (1, 11),

-- Minecraft
(2, 7), (2, 8), (2, 10), (2, 11),

-- Cyberpunk 2077
(3, 1), (3, 2), (3, 4), (3, 5), (3, 11),

-- Elden Ring
(4, 1), (4, 2), (4, 4), (4, 11),

-- Portal 2
(5, 3), (5, 9), (5, 10), (5, 11),

-- StarCraft II
(6, 6), (6, 10), (6, 11),

-- Hollow Knight
(7, 2), (7, 3), (7, 15), (7, 16), (7, 11),

-- Stardew Valley
(8, 7), (8, 11), (8, 15),

-- Terraria
(9, 2), (9, 3), (9, 8), (9, 10), (9, 15),

-- Doom Eternal
(10, 2), (10, 5), (10, 11),

-- Celeste
(11, 12), (11, 15), (11, 11),

-- Resident Evil 4 Remake
(12, 2), (12, 3), (12, 14), (12, 11),

-- Forza Horizon 5
(13, 13), (13, 4), (13, 10),

-- Hades
(14, 2), (14, 17), (14, 15), (14, 11),

-- Civilization VI
(15, 6), (15, 7), (15, 10), (15, 11),

-- Breath of the Wild
(16, 2), (16, 3), (16, 4), (16, 9), (16, 11),

-- God of War
(17, 2), (17, 3), (17, 11),

-- Red Dead Redemption 2
(18, 2), (18, 3), (18, 4), (18, 11),

-- Among Us
(19, 10), (19, 15),

-- Slay the Spire
(20, 6), (20, 17), (20, 15), (20, 11),

-- Dark Souls III
(21, 1), (21, 2), (21, 11),

-- Sekiro
(22, 2), (22, 3), (22, 11),

-- Baldur's Gate 3
(23, 1), (23, 6), (23, 10), (23, 11),

-- Mass Effect Legendary Edition
(24, 1), (24, 3), (24, 5), (24, 11),

-- Skyrim
(25, 1), (25, 3), (25, 4), (25, 11),

-- Fallout New Vegas
(26, 1), (26, 5), (26, 4), (26, 11),

-- The Last of Us Part I
(27, 2), (27, 3), (27, 14), (27, 11),

-- Uncharted 4
(28, 2), (28, 3), (28, 11),

-- Spider-Man Remastered
(29, 2), (29, 3), (29, 4), (29, 11),

-- Batman Arkham Knight
(30, 2), (30, 3), (30, 20), (30, 11),

-- Ori and the Will of the Wisps
(31, 12), (31, 16), (31, 3), (31, 11),

-- Dead Cells
(32, 2), (32, 12), (32, 17), (32, 15), (32, 11),

-- Cuphead
(33, 2), (33, 12), (33, 15), (33, 10),

-- It Takes Two
(34, 3), (34, 9), (34, 10),

-- Overcooked 2
(35, 7), (35, 10), (35, 15),

-- Rocket League
(36, 18), (36, 10),

-- FIFA 23
(37, 18), (37, 10),

-- NBA 2K24
(38, 18), (38, 10),

-- Mortal Kombat 11
(39, 19), (39, 2), (39, 10),

-- Street Fighter 6
(40, 19), (40, 2), (40, 10),

-- Cities Skylines
(41, 6), (41, 7), (41, 11),

-- The Sims 4
(42, 7), (42, 11),

-- Planet Zoo
(43, 6), (43, 7), (43, 11),

-- Factorio
(44, 6), (44, 7), (44, 11),

-- RimWorld
(45, 6), (45, 7), (45, 8), (45, 11),

-- Subnautica
(46, 3), (46, 8), (46, 14), (46, 11),

-- The Forest
(47, 8), (47, 14), (47, 10),

-- Phasmophobia
(48, 14), (48, 10), (48, 15),

-- Alan Wake 2
(49, 3), (49, 14), (49, 11),

-- Control
(50, 2), (50, 3), (50, 11);

-- Achievements
INSERT INTO achievements
(achievement_number, achievement_text, is_achievement_done, game_id)
VALUES
-- The Witcher 3
(1, 'Finish the main story', TRUE, 1),
(2, 'Complete all Witcher contracts', TRUE, 1),
(3, 'Reach level 50', TRUE, 1),
(4, 'Complete Blood and Wine', FALSE, 1),

-- Minecraft
(1, 'Craft a diamond pickaxe', TRUE, 2),
(2, 'Defeat the Ender Dragon', TRUE, 2),
(3, 'Build an automatic farm', FALSE, 2),
(4, 'Find a Nether Fortress', TRUE, 2),

-- Cyberpunk 2077
(1, 'Complete the prologue', TRUE, 3),
(2, 'Reach Street Cred 50', FALSE, 3),
(3, 'Buy all apartments', FALSE, 3),
(4, 'Complete Panam storyline', TRUE, 3),

-- Elden Ring
(1, 'Defeat Margit', TRUE, 4),
(2, 'Become Elden Lord', TRUE, 4),
(3, 'Collect all Legendary Armaments', FALSE, 4),
(4, 'Defeat Malenia', FALSE, 4),

-- Portal 2
(1, 'Escape the facility', FALSE, 5),
(2, 'Complete co-op mode', FALSE, 5),
(3, 'Solve all advanced test chambers', FALSE, 5),

-- StarCraft II
(1, 'Finish Wings of Liberty campaign', TRUE, 6),
(2, 'Win 50 multiplayer matches', FALSE, 6),
(3, 'Complete campaign on hard difficulty', FALSE, 6),

-- Hollow Knight
(1, 'Defeat Hornet', TRUE, 7),
(2, 'Unlock all movement abilities', TRUE, 7),
(3, 'Complete the Path of Pain', FALSE, 7),
(4, 'Reach 100% completion', FALSE, 7),

-- Stardew Valley
(1, 'Restore the Community Center', FALSE, 8),
(2, 'Reach level 10 farming', TRUE, 8),
(3, 'Earn 1,000,000 gold', FALSE, 8),

-- Terraria
(1, 'Defeat the Eye of Cthulhu', TRUE, 9),
(2, 'Enter Hardmode', FALSE, 9),
(3, 'Defeat the Moon Lord', FALSE, 9),

-- Doom Eternal
(1, 'Complete the campaign', TRUE, 10),
(2, 'Collect all Slayer Gates', FALSE, 10),
(3, 'Fully upgrade the Praetor Suit', FALSE, 10),

-- Celeste
(1, 'Complete Chapter 1', TRUE, 11),
(2, 'Finish the main story', TRUE, 11),
(3, 'Collect all strawberries', FALSE, 11),

-- Resident Evil 4 Remake
(1, 'Finish the story', FALSE, 12),
(2, 'Upgrade a weapon fully', TRUE, 12),
(3, 'Complete Professional difficulty', FALSE, 12),

-- Forza Horizon 5
(1, 'Win the first showcase event', TRUE, 13),
(2, 'Own 50 cars', FALSE, 13),
(3, 'Complete all main festival events', FALSE, 13),

-- Hades
(1, 'Escape the Underworld once', TRUE, 14),
(2, 'Unlock all weapons', TRUE, 14),
(3, 'Complete the epilogue', FALSE, 14),

-- Civilization VI
(1, 'Win a science victory', FALSE, 15),
(2, 'Win a domination victory', FALSE, 15),
(3, 'Play a full multiplayer match', TRUE, 15),

-- Breath of the Wild
(1, 'Leave the Great Plateau', TRUE, 16),
(2, 'Free all Divine Beasts', TRUE, 16),
(3, 'Defeat Calamity Ganon', FALSE, 16),
(4, 'Find all memories', FALSE, 16),

-- God of War
(1, 'Finish the main story', TRUE, 17),
(2, 'Defeat all Valkyries', FALSE, 17),
(3, 'Fully upgrade Leviathan Axe', TRUE, 17),

-- Red Dead Redemption 2
(1, 'Complete Chapter 1', TRUE, 18),
(2, 'Finish the main story', FALSE, 18),
(3, 'Reach 100% completion', FALSE, 18),

-- Among Us
(1, 'Win as Crewmate', TRUE, 19),
(2, 'Win as Impostor', FALSE, 19),
(3, 'Complete all tasks in one match', TRUE, 19),

-- Slay the Spire
(1, 'Win with Ironclad', TRUE, 20),
(2, 'Win with Silent', FALSE, 20),
(3, 'Reach Ascension 5', FALSE, 20),

-- Dark Souls III
(1, 'Defeat Iudex Gundyr', TRUE, 21),
(2, 'Link the First Flame', FALSE, 21),
(3, 'Collect all rings', FALSE, 21),

-- Sekiro
(1, 'Defeat Genichiro', TRUE, 22),
(2, 'Complete the Immortal Severance ending', FALSE, 22),
(3, 'Defeat all bosses', FALSE, 22),

-- Baldur's Gate 3
(1, 'Finish Act 1', TRUE, 23),
(2, 'Recruit all main companions', TRUE, 23),
(3, 'Complete the main story', FALSE, 23),

-- Mass Effect Legendary Edition
(1, 'Finish Mass Effect 1', FALSE, 24),
(2, 'Finish Mass Effect 2', FALSE, 24),
(3, 'Finish Mass Effect 3', FALSE, 24),

-- Skyrim
(1, 'Complete the main quest', TRUE, 25),
(2, 'Join the Companions', TRUE, 25),
(3, 'Defeat Alduin', TRUE, 25),

-- Fallout New Vegas
(1, 'Reach New Vegas', TRUE, 26),
(2, 'Choose a faction ending', TRUE, 26),
(3, 'Complete all companion quests', FALSE, 26),

-- The Last of Us Part I
(1, 'Complete the story', FALSE, 27),
(2, 'Fully upgrade a weapon', FALSE, 27),
(3, 'Find all collectibles', FALSE, 27),

-- Uncharted 4
(1, 'Complete the story', TRUE, 28),
(2, 'Find 50 treasures', FALSE, 28),
(3, 'Complete crushing difficulty', FALSE, 28),

-- Spider-Man Remastered
(1, 'Complete the main story', TRUE, 29),
(2, 'Unlock all suits', FALSE, 29),
(3, 'Complete all districts', FALSE, 29),

-- Batman Arkham Knight
(1, 'Complete the main story', FALSE, 30),
(2, 'Stop all Most Wanted missions', FALSE, 30),
(3, 'Collect 100 Riddler trophies', FALSE, 30),

-- Ori and the Will of the Wisps
(1, 'Complete the prologue', TRUE, 31),
(2, 'Unlock all abilities', TRUE, 31),
(3, 'Finish the story', TRUE, 31),

-- Dead Cells
(1, 'Defeat the Concierge', TRUE, 32),
(2, 'Reach the Clock Tower', FALSE, 32),
(3, 'Complete a run', FALSE, 32),

-- Cuphead
(1, 'Defeat all bosses on Inkwell Isle I', TRUE, 33),
(2, 'Finish the game', FALSE, 33),
(3, 'Get an A rank on 5 bosses', FALSE, 33),

-- It Takes Two
(1, 'Complete the shed chapter', TRUE, 34),
(2, 'Complete the story', TRUE, 34),
(3, 'Find all minigames', FALSE, 34),

-- Overcooked 2
(1, 'Complete world 1', TRUE, 35),
(2, 'Earn 3 stars on 10 levels', FALSE, 35),
(3, 'Complete the story', FALSE, 35),

-- Rocket League
(1, 'Score your first goal', TRUE, 36),
(2, 'Win 10 online matches', TRUE, 36),
(3, 'Reach Gold rank', FALSE, 36),

-- FIFA 23
(1, 'Win a career mode match', TRUE, 37),
(2, 'Win an online match', FALSE, 37),
(3, 'Build an Ultimate Team squad', FALSE, 37),

-- NBA 2K24
(1, 'Win a MyCareer game', FALSE, 38),
(2, 'Score 30 points in a game', FALSE, 38),
(3, 'Win an online match', FALSE, 38),

-- Mortal Kombat 11
(1, 'Finish story mode', TRUE, 39),
(2, 'Perform 10 fatalities', TRUE, 39),
(3, 'Win 20 online matches', FALSE, 39),

-- Street Fighter 6
(1, 'Complete arcade mode', TRUE, 40),
(2, 'Win 10 ranked matches', FALSE, 40),
(3, 'Try World Tour mode', TRUE, 40),

-- Cities Skylines
(1, 'Reach population 10,000', TRUE, 41),
(2, 'Build an airport', FALSE, 41),
(3, 'Reach population 100,000', FALSE, 41),

-- The Sims 4
(1, 'Create a household', TRUE, 42),
(2, 'Reach level 10 in a career', FALSE, 42),
(3, 'Build a two-story house', TRUE, 42),

-- Planet Zoo
(1, 'Build the first habitat', TRUE, 43),
(2, 'Reach 5-star zoo rating', FALSE, 43),
(3, 'Breed an endangered animal', FALSE, 43),

-- Factorio
(1, 'Automate red science', TRUE, 44),
(2, 'Launch a rocket', FALSE, 44),
(3, 'Build a train network', TRUE, 44),

-- RimWorld
(1, 'Survive the first winter', TRUE, 45),
(2, 'Build a hospital room', TRUE, 45),
(3, 'Launch the ship', FALSE, 45),

-- Subnautica
(1, 'Build a seabase', TRUE, 46),
(2, 'Build the Cyclops', FALSE, 46),
(3, 'Escape the planet', FALSE, 46),

-- The Forest
(1, 'Build a shelter', TRUE, 47),
(2, 'Explore the caves', FALSE, 47),
(3, 'Find Timmy', FALSE, 47),

-- Phasmophobia
(1, 'Correctly identify a ghost', TRUE, 48),
(2, 'Survive 10 investigations', FALSE, 48),
(3, 'Complete all optional objectives once', FALSE, 48),

-- Alan Wake 2
(1, 'Complete the first chapter', TRUE, 49),
(2, 'Find 10 lunch boxes', FALSE, 49),
(3, 'Finish the story', FALSE, 49),

-- Control
(1, 'Unlock telekinesis', TRUE, 50),
(2, 'Complete the main story', TRUE, 50),
(3, 'Complete all side missions', FALSE, 50);