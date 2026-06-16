CREATE DATABASE game_tracker;

USE game_tracker;

CREATE TABLE statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    developer VARCHAR(255),
    publisher VARCHAR(255),
    is_favorite BOOLEAN DEFAULT FALSE,
    rating TINYINT UNSIGNED NULL CHECK (rating BETWEEN 1 AND 10),
    notes TEXT,
    launch_year SMALLINT CHECK (launch_year BETWEEN 1950 AND 2100),   
    game_status_id INT NULL,
    
    FOREIGN KEY (game_status_id) REFERENCES statuses(id) ON DELETE SET NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE game_categories (
    game_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (game_id, category_id),

    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    achievement_number INT NOT NULL,
    achievement_text TEXT,
    is_achievement_done BOOLEAN DEFAULT FALSE,
    game_id int NOT NULL,

    UNIQUE (game_id, achievement_number),

    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);
