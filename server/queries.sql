/* Search statuses */

SELECT status_name FROM statuses;

/* Search specific game from statuses */

SELECT games.title, statuses.status_name
FROM games 
LEFT JOIN statuses
    ON statuses.id = games.game_status_id
WHERE statuses.status_name like '%Completed%';


/* Search game titles */

SELECT title FROM games;

/* Search developer */

SELECT title 
FROM games
WHERE developer like '%ubisoft%';

/* Search publisher */

SELECT title
FROM games
WHERE publisher like '%ubisoft%';

/* Search favorites */

SELECT title
FROM games
WHERE is_favorite = TRUE;


/* Search rating */

SELECT title
FROM games
ORDER BY rating DESC;

SELECT title
FROM games
WHERE rating = 9;

/* Search launch year */

SELECT title
FROM games
ORDER BY launch_year;

SELECT title
FROM games
WHERE launch_year = 2023;

/* Search titles with categories */

SELECT games.title, categories.category
FROM games
JOIN game_categories
    ON game_categories.game_id = games.id
JOIN categories
    ON game_categories.category_id = categories.id
WHERE categories.category like '%singleplayer%';

/* Search categories by titles */

/* search categories */

SELECT categories.category FROM categories;

/* Search achivements with numbers and whether it is done */

SELECT games.title, achievements.achievement_number, achievements.achievement_text, achievements.is_achievement_done
FROM games
JOIN achievements
    ON achievements.game_id = games.id
WHERE games.title like '%fortnite%';



/* Search game with title, developer, publisher, favorite, rating, notes, launch year, status */

SELECT games.title,
    games.developer,
    games.publisher,
    games.is_favorite,
    games.rating,
    games.notes,
    games.launch_year,
    statuses.status_name
FROM games
JOIN statuses
    ON statuses.id = games.game_status_id
WHERE games.title like '%fortnite%';



/* Insert game with title, developer, publisher, rating, notes, launch year */

INSERT INTO games (title, developer, publisher, rating, notes, launch_year) VALUES
('Fortnite', 'Epic Games', 'Epic Games', 8, 'Battle Royale', 2017);

/* Insert category */

INSERT INTO categories (category) VALUES 
('Shooter');

/* link categories to specific game */

INSERT INTO game_categories (game_id, category_id)
SELECT games.id, categories.id
FROM games
CROSS JOIN categories
WHERE games.title like '%fortnite%'
    AND categories.category like '%Shooter%';


/* Insert status */

INSERT INTO statuses (status_name) 
VALUE ('Completed');


/* change game with title, developer, publisher, favorite, rating, notes, launch year, status */

UPDATE games
SET title = 'Fortnite2',
    developer = 'Epic Games',
    publisher = 'Epic Games'
WHERE title like '%Fortnite%';



/* delete game */

DELETE FROM games
WHERE title like '%Fortnite%';


/* search how many achievements i have completed */

SELECT COUNT(*) AS completed_achievements 
FROM achievements
WHERE is_achievement_done = TRUE;



/* search completed achievements count and total achievements per game */

SELECT games.title, 
    COUNT(achievements.id) AS total_achievements, 
    COALESCE(SUM(achievements.is_achievement_done), 0) 
        AS completed_achievements
FROM games
LEFT JOIN achievements
    ON achievements.game_id = games.id
WHERE games.title like '%Skyrim%'
group by games.id, games.title;

