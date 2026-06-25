require("dotenv").config()

const cors = require("cors");


const express = require("express")
const app = express()
const path = require("path")

const mysql = require("mysql2/promise")
const PORT = 3000

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

//middleware

//app.use(express.static(path.join(__dirname, "frontend")))

app.use(express.json())
app.use(cors());

// codigo validar
function validate(req, res, next) {
    const { title, developer, publisher, launchYear, rating, notes, statusId, categories } = req.body

    const validTitle = String(title || "").trim();
    const validDeveloper = String(developer || "").trim();
    const validPublisher = String(publisher || "").trim();
    const validLaunchYear = Number(launchYear);
    const currentYear = new Date().getFullYear()
    const validRating = rating === null || rating === undefined || rating === "" ? null : Number(rating);
    const validNotes = String(notes || "").trim();
    const validStatusId = statusId === null || statusId === undefined || statusId === ""
        ? null
        : Number(statusId);

    if (validTitle.length < 1 || validTitle.length > 255) {
        return res.status(400).json({ error: "Title is required (between 1 and 255 characters" })
    }

    if (validDeveloper.length < 1 || validDeveloper.length > 255) {
        return res.status(400).json({ error: "Developer must have between 1 and 255 characters" })
    }

    if (validPublisher.length < 1 || validPublisher.length > 255) {
        return res.status(400).json({ error: "Publisher name must have between between 1 and 255 characters" })
    }

    if (!Number.isInteger(validLaunchYear) || validLaunchYear < 1950 || validLaunchYear > currentYear) {
        return res.status(400).json({ error: "Launch year must be between 1900 and current year" })
    }

    if (validRating !== null && (!Number.isFinite(validRating) || validRating < 1 || validRating > 10)) {
        return res.status(400).json({ error: "Rating must be between 1 and 10." })
    };
    if (validStatusId !== null && (!Number.isInteger(validStatusId) || validStatusId < 1)) {
        return res.status(400).json({ error: "Invalid status." })
    }

    req.body = {
        title: validTitle,
        developer: validDeveloper,
        publisher: validPublisher,
        launchYear: validLaunchYear,
        rating: validRating,
        notes: validNotes,
        statusId: validStatusId,
        categories: Array.isArray(categories) ? categories : []
    }
    next()

}

app.get("/api/games", async (req, res, next) => {
    try {
        const requestedPage = Number(req.query.page || 1);
        const page = Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [countResult] = await pool.execute(
            "SELECT COUNT(*) AS total FROM games;"
        );

        const totalGames = countResult[0].total;
        const totalPages = Math.ceil(totalGames / limit);

        const [games] = await pool.execute(
            `
            SELECT
                games.id,
                games.title,
                COALESCE(statuses.status_name, 'No status') AS status,
                CASE
                    WHEN COUNT(achievements.id) = 0 THEN 0
                    ELSE ROUND(
                        SUM(achievements.is_achievement_done) / COUNT(achievements.id) * 100
                    )
                END AS achievementProgress
            FROM games
            LEFT JOIN statuses
                ON statuses.id = games.game_status_id
            LEFT JOIN achievements
                ON achievements.game_id = games.id
            GROUP BY games.id, games.title, statuses.status_name
            ORDER BY games.title ASC
            LIMIT ${limit} OFFSET ${offset};
            `

        );

        return res.status(200).json({
            games,
            totalPages
        });
    } catch (error) {
        next(error);
    }



});

// detailed search

app.get("/api/games/filter", async (req, res, next) => {
    try {
        const requestedPage = Number(req.query.page || 1);
        const page = Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;

        const limit = 10;
        const offset = (page - 1) * limit;

        const {
            title,
            developer,
            publisher,
            status,
            category,
            ratingOrder,
            launchYearOrder,
            titleOrder,
            developerOrder,
            publisherOrder
        } = req.query;

        const where = [];
        const values = [];
        const orderBy = [];

        if (title) {
            where.push("games.title LIKE ?");
            values.push(`%${title}%`);
        }

        if (developer) {
            where.push("games.developer LIKE ?");
            values.push(`%${developer}%`);
        }

        if (publisher) {
            where.push("games.publisher LIKE ?");
            values.push(`%${publisher}%`);
        }

        if (titleOrder === "asc") {
            orderBy.push("games.title ASC");
        } else if (titleOrder === "desc") {
            orderBy.push("games.title DESC");
        }

        if (developerOrder === "asc") {
            orderBy.push("games.developer ASC");
        } else if (developerOrder === "desc") {
            orderBy.push("games.developer DESC");
        }

        if (publisherOrder === "asc") {
            orderBy.push("games.publisher ASC");
        } else if (publisherOrder === "desc") {
            orderBy.push("games.publisher DESC");
        }

        if (status) {
            where.push("statuses.status_name LIKE ?");
            values.push(`%${status}%`);
        }

        if (category) {
            where.push("categories.category LIKE ?");
            values.push(`%${category}%`);
        }

        if (ratingOrder === "asc") {
            orderBy.push("games.rating ASC");
        } else if (ratingOrder === "desc") {
            orderBy.push("games.rating DESC");
        }

        if (launchYearOrder === "asc") {
            orderBy.push("games.launch_year ASC");
        } else if (launchYearOrder === "desc") {
            orderBy.push("games.launch_year DESC");
        }

        const orderSql = orderBy.length > 0
            ? `ORDER BY ${orderBy.join(", ")}`
            : "ORDER BY games.title ASC";

        const whereSql = where.length > 0
            ? `WHERE ${where.join(" AND ")}`
            : "";

        const [countResult] = await pool.execute(
            `
            SELECT COUNT(DISTINCT games.id) AS total
            FROM games
            LEFT JOIN statuses
                ON statuses.id = games.game_status_id
            LEFT JOIN game_categories
                ON game_categories.game_id = games.id
            LEFT JOIN categories
                ON categories.id = game_categories.category_id
            ${whereSql};
            `,
            values
        );

        const totalGames = countResult[0].total;
        const totalPages = Math.ceil(totalGames / limit);

        const [games] = await pool.execute(
            `
            SELECT
                games.id,
                games.title,
                COALESCE(statuses.status_name, 'No status') AS status,
                CASE
                    WHEN COUNT(achievements.id) = 0 THEN 0
                    ELSE ROUND(
                        SUM(achievements.is_achievement_done) / COUNT(achievements.id) * 100
                    )
                END AS achievementProgress
            FROM games
            LEFT JOIN statuses
                ON statuses.id = games.game_status_id
            LEFT JOIN achievements
                ON achievements.game_id = games.id
            LEFT JOIN game_categories
                ON game_categories.game_id = games.id
            LEFT JOIN categories
                ON categories.id = game_categories.category_id
            ${whereSql}
            GROUP BY games.id, games.title, statuses.status_name
            ${orderSql}
            LIMIT ${limit} OFFSET ${offset};
            `,
            values
        );

        return res.status(200).json({
            games,
            totalPages
        });
    } catch (error) {
        next(error);
    }
});

// get favorites

app.get("/api/games/favorites", async (req, res, next) => {
    try {
        const requestedPage = Number(req.query.page || 1);
        const page = Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [countResult] = await pool.execute(
            "SELECT COUNT(*) AS total FROM games WHERE is_favorite = TRUE;"
        );

        const totalGames = countResult[0].total;
        const totalPages = Math.ceil(totalGames / limit);


        const [games] = await pool.execute(
            `
            SELECT
                games.id,
                games.title,
                COALESCE(statuses.status_name, 'No status') AS status,
                CASE
                    WHEN COUNT(achievements.id) = 0 THEN 0
                    ELSE ROUND(
                        SUM(achievements.is_achievement_done) / COUNT(achievements.id) * 100
                    )
                END AS achievementProgress
            FROM games
            LEFT JOIN statuses
                ON statuses.id = games.game_status_id
            LEFT JOIN achievements
                ON achievements.game_id = games.id
            WHERE games.is_favorite = TRUE
            GROUP BY games.id, games.title, statuses.status_name
            ORDER BY games.title ASC
            LIMIT ${limit} OFFSET ${offset};
            `

        );

        return res.status(200).json({
            games,
            totalPages
        });

    } catch (error) {
        next(error);
    }


});





// automatic search for searchbar displayed on the dropdown menu
app.get("/api/search", async (req, res, next) => {
    try {
        const search = String(req.query.q || "").trim();

        if (search.length < 2) {
            return res.status(200).json({
                titles: [],
                developers: [],
                publishers: []
            });
        }

        const likeSearch = `%${search}%`;


        const [titles] = await pool.execute(
            "SELECT id, title FROM games WHERE title LIKE ? LIMIT 5;",
            [likeSearch]
        );

        const [developers] = await pool.execute(
            "SELECT DISTINCT developer FROM games WHERE developer LIKE ? AND developer IS NOT NULL LIMIT 5;",
            [likeSearch]
        );

        const [publishers] = await pool.execute(
            "SELECT DISTINCT publisher FROM games WHERE publisher LIKE ? AND publisher IS NOT NULL LIMIT 5;",
            [likeSearch]
        );

        return res.status(200).json({
            titles,
            developers,
            publishers
        });
    } catch (error) {
        next(error);
    }
});

// bar search after pressing enter or clicking search button
app.get("/api/games/search", async (req, res, next) => {
    try {
        const requestedPage = Number(req.query.page || 1);
        const page = Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;

        const limit = 10;
        const offset = (page - 1) * limit;
        const search = String(req.query.q || "").trim();

        const [countResult] = await pool.execute(
            "SELECT COUNT(*) AS total FROM games WHERE title LIKE ?;",
            [`%${search}%`]
        );

        const totalGames = countResult[0].total;
        const totalPages = Math.ceil(totalGames / limit);




        if (search.length < 1) {
            return res.status(200).json([]);
        }

        const [games] = await pool.execute(
            `
            SELECT
                games.id,
                games.title,
                COALESCE(statuses.status_name, 'No status') AS status,
                CASE
                    WHEN  COUNT(achievements.id) = 0 THEN 0
                    ELSE ROUND(
                        SUM(achievements.is_achievement_done) / COUNT(achievements.id) * 100
                    )
                END AS achievementProgress
            FROM games
            LEFT JOIN statuses
                ON statuses.id = games.game_status_id
            LEFT JOIN achievements
                ON achievements.game_id = games.id
            WHERE games.title LIKE ?
            GROUP BY games.id, games.title, statuses.status_name
            LIMIT ${limit} OFFSET ${offset};
            `,
            [`%${search}%`]
        );

        return res.status(200).json({
            games,
            totalPages
        });
    } catch (error) {
        next(error);
    }
});


// get games by id for the game page
app.get("/api/games/:id", async (req, res, next) => {
    try {
        const gameId = Number(req.params.id);

        if (!Number.isInteger(gameId) || gameId < 1) {
            return res.status(400).json({ error: "This game doesn't exist." });
        }

        const [statuses] = await pool.execute(
            "SELECT id, status_name AS statusName FROM statuses ORDER BY status_name;"
        );

        const [games] = await pool.execute(
            `
            SELECT
                games.id,
                games.title,
                games.developer,
                games.publisher,
                games.is_favorite AS isFavorite,
                games.rating,
                games.notes,
                games.launch_year AS launchYear,
                games.game_status_id AS statusId,
                COALESCE(statuses.status_name, 'No status') AS status,
                CASE
                    WHEN COUNT(achievements.id) = 0 THEN 0
                    ELSE ROUND(
                        SUM(achievements.is_achievement_done) / COUNT(achievements.id) * 100
                    )
                END AS achievementProgress
            FROM games
            LEFT JOIN statuses
                ON statuses.id = games.game_status_id
            LEFT JOIN achievements
                ON achievements.game_id = games.id
            WHERE games.id = ?
            GROUP BY
                games.id,
                games.title,
                games.developer,
                games.publisher,
                games.is_favorite,
                games.rating,
                games.notes,
                games.launch_year,
                games.game_status_id,
                statuses.status_name;
            `,
            [gameId]
        );

        if (games.length === 0) {
            return res.status(404).json({ error: "Game not found." });
        }

        const [achievements] = await pool.execute(
            `
            SELECT
                id,
                achievement_number AS achievementNumber,
                achievement_text AS achievementText,
                is_achievement_done AS isAchievementDone
            FROM achievements
            WHERE game_id = ?
            ORDER BY achievement_number;
            `,
            [gameId]
        );

        const [categories] = await pool.execute(
            `
            SELECT categories.id, categories.category
            FROM categories
            JOIN game_categories
                ON game_categories.category_id = categories.id
            WHERE game_categories.game_id = ?
            ORDER BY categories.category;
            `,
            [gameId]
        );

        return res.status(200).json({
            game: {
                ...games[0],
                categories
            },
            achievements, statuses
        });
    } catch (error) {
        next(error);
    }
});


// used by the category autocomplete inputs. Returns matching existing categories.
app.get("/api/categories/search", async (req, res, next) => {
    try {
        const search = String(req.query.q || "").trim();

        const [categories] = await pool.execute(
            `
            SELECT id, category
            FROM categories
            WHERE ? = '' OR category LIKE ?
            ORDER BY category
            LIMIT 10;
            `,
            [search, `%${search}%`]
        );

        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

app.post("/api/games", validate, async (req, res, next) => {
    try {
        const { title, developer, publisher, launchYear, rating, notes } = req.body;


        const [result] = await pool.execute(
            `
            INSERT INTO games
                (title, developer, publisher, launch_year, rating, notes)
            VALUES
                (?, ?, ?, ?, ?, ?)
            `,
            [
                title,
                developer,
                publisher,
                launchYear,
                rating,
                notes
            ]
        );

        return res.status(201).json({
            message: "Game created sucessfully.",
            id: result.insertId
        });

    } catch (error) {
        next(error);
    }
});

// put to toggle favorite in game page
app.put("/api/games/:id/favorite", async (req, res, next) => {
    try {
        const gameId = Number(req.params.id);
        const { isFavorite } = req.body;

        if (!Number.isInteger(gameId) || gameId < 1) {
            return res.status(400).json({ error: "Invalid game id." });
        }

        const validIsFavorite = Boolean(isFavorite);

        const [result] = await pool.execute(
            `
            UPDATE games
            SET is_favorite = ?
            WHERE id = ?;
            `,
            [validIsFavorite, gameId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Game not found." });
        }

        return res.status(200).json({
            message: "Favorite updated successfully.",
            isFavorite: validIsFavorite
        });
    } catch (error) {
        next(error);
    }
});

// put to edit game base info

app.put("/api/games/:id", validate, async (req, res, next) => {
    try {
        const gameId = Number(req.params.id);

        if (!Number.isInteger(gameId) || gameId < 1) {
            return res.status(400).json({ error: "Game doesn't exist" });
        }

        const { title, developer, publisher, launchYear, rating, notes, statusId, categories } = req.body;

        const [result] = await pool.execute(
            `
            UPDATE games
            SET
                title = ?,
                developer = ?,
                publisher = ?,
                launch_year = ?,
                rating = ?,
                notes = ?,
                game_status_id = ?
            WHERE id = ?;
            `,
            [
                title,
                developer,
                publisher,
                launchYear,
                rating,
                notes,
                statusId,
                gameId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Game not found." });
        }


        await pool.execute(
            "DELETE FROM game_categories WHERE game_id = ?;",
            [gameId]
        );

        if (Array.isArray(categories)) {
            for (const category of categories) {
                const categoryName = String(category.category || "").trim();

                if (!categoryName) {
                    continue;
                }

                let categoryId = category.id;

                if (!categoryId) {
                    const [existingCategories] = await pool.execute(
                        "SELECT id FROM categories WHERE category = ?;",
                        [categoryName]
                    );

                    if (existingCategories.length > 0) {
                        categoryId = existingCategories[0].id;
                    } else {
                        const [categoryResult] = await pool.execute(
                            "INSERT INTO categories (category) VALUES (?);",
                            [categoryName]
                        );

                        categoryId = categoryResult.insertId;
                    }
                }

                await pool.execute(
                    `
                    INSERT IGNORE INTO game_categories
                        (game_id, category_id)
                    VALUES
                        (?, ?);
                    `,
                    [gameId, categoryId]
                );
            }
        }

        return res.status(200).json({
            message: "Game updated successfully.",
            game: {
                id: gameId,
                title,
                developer,
                publisher,
                launchYear,
                rating,
                notes,
                statusId,
                categories
            }
        });

    } catch (error) {
        next(error);
    }
});



// post to add achievements
app.post("/api/games/:id/achievements", async (req, res, next) => {
    try {
        const gameId = Number(req.params.id);
        const { achievementNumber, achievementText, isAchievementDone } = req.body;

        if (!Number.isInteger(gameId) || gameId < 1) {
            return res.status(400).json({ error: "Invalid game id." });
        }

        const validAchievementNumber = Number(achievementNumber);
        const validAchievementText = String(achievementText || "").trim();
        const validIsAchievementDone = Boolean(isAchievementDone);

        if (!Number.isInteger(validAchievementNumber) || validAchievementNumber < 1) {
            return res.status(400).json({ error: "Invalid achievement number." });
        }

        if (validAchievementText.length < 1) {
            return res.status(400).json({ error: "Achievement text is required." });
        }

        const [existingAchievement] = await pool.execute(
            `
            SELECT id
            FROM achievements
            WHERE game_id = ? AND achievement_number = ?;
            `,
            [gameId, validAchievementNumber]
        );

        if (existingAchievement.length > 0) {
            return res.status(400).json({
                error: "This achievement number already exists for this game."
            });
        }

        const [result] = await pool.execute(
            `
            INSERT INTO achievements
                (game_id, achievement_number, achievement_text, is_achievement_done)
            VALUES
                (?, ?, ?, ?);
            `,
            [
                gameId,
                validAchievementNumber,
                validAchievementText,
                validIsAchievementDone
            ]
        );

        return res.status(201).json({
            id: result.insertId,
            achievementNumber: validAchievementNumber,
            achievementText: validAchievementText,
            isAchievementDone: validIsAchievementDone
        });
    } catch (error) {
        next(error);
    }
});


// put to edit achievements
app.put("/api/achievements/:id", async (req, res, next) => {
    try {
        const achievementId = Number(req.params.id);
        const { achievementNumber, achievementText, isAchievementDone } = req.body;

        if (!Number.isInteger(achievementId) || achievementId < 1) {
            return res.status(400).json({ error: "Invalid achievement id." });
        }

        const validAchievementNumber = Number(achievementNumber);
        const validAchievementText = String(achievementText || "").trim();
        const validIsAchievementDone = Boolean(isAchievementDone);

        if (!Number.isInteger(validAchievementNumber) || validAchievementNumber < 1) {
            return res.status(400).json({ error: "Invalid achievement number." });
        }

        if (validAchievementText.length < 1) {
            return res.status(400).json({ error: "Achievement text is required." });
        }

        const [result] = await pool.execute(
            `
            UPDATE achievements
            SET
                achievement_number = ?,
                achievement_text = ?,
                is_achievement_done = ?
            WHERE id = ?;
            `,
            [

                validAchievementNumber,
                validAchievementText,
                validIsAchievementDone,
                achievementId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Achievement not found." });
        }

        return res.status(200).json({ message: "Achievement updated successfully." });
    } catch (error) {
        next(error);
    }
});

// delete an achievement
app.delete("/api/achievements/:id", async (req, res, next) => {
    try {
        const achievementId = Number(req.params.id);

        if (!Number.isInteger(achievementId) || achievementId < 1) {
            return res.status(400).json({ error: "Invalid achievement id." });
        }

        const [result] = await pool.execute(
            "DELETE FROM achievements WHERE id = ?;",
            [achievementId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Achievement not found." });
        }

        return res.status(200).json({
            message: "Achievement deleted successfully."
        });
    } catch (error) {
        next(error);
    }
});

// delete the game on the game page
app.delete("/api/games/:id", async (req, res, next) => {
    try {
        const gameId = Number(req.params.id);

        if (!Number.isInteger(gameId) || gameId < 1) {
            return res.status(400).json({ error: "This game doesn't exist." });
        }

        const [result] = await pool.execute(
            "DELETE FROM games WHERE id = ?;",
            [gameId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Game not found." });
        }

        return res.status(200).json({ message: "Game deleted successfully." });
    } catch (error) {
        next(error);
    }
});



app.use((error, req, res, next) => {
    console.log("Error: ", error.message)
    res.status(500).json({ error: "Server error!", route: req.url, req: req.method })
})

app.listen(PORT, async () => {
    try {
        await pool.execute("SELECT 1")
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error")
    }
})