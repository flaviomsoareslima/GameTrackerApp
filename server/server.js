require("dotenv").config()

console.log({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME
});

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

// codigo validar
function validate(req, res, next) {
    const {title, developer, publisher, launchYear} = req.body

    const validTitle = String(title).trim()
    const validDeveloper = String(developer).trim()
    const validPublisher = String(publisher).trim()
    const validLaunchYear = Number(launchYear)
    const currentYear = new Date().getFullYear()

    if (validTitle.length < 1 || validTitle.length > 255) {
        return res.status(400).json({ error: "Title is required (between 1 and 255 characters"})
    }

    if (validDeveloper.length < 1 || validDeveloper.length > 255) {
        return res.status(400).json({ error: "Developer must have between 1 and 255 characters"})
    }

    if (validPublisher.length < 1 || validPublisher.length > 255) {
        return res.status(400).json({ error: "Publisher name must have between between 1 and 255 characters"})
    }

    if(validLaunchYear < 1900 || validLaunchYear > currentYear) {
        return res.status(400).json({ error: "Launch year must be between 1900 and current year"})
    }

    req.body = {
        title: validTitle,
        developer: validDeveloper,
        publisher: validPublisher,
        launchYear: validLaunchYear
    }
    next()

}

app.get("/api/titles", async (req, res) => {
    const query = "SELECT title FROM games;"
    const [games] = await pool.execute(query)

    return res.status(200).json(games)
})

// get favorites

app.get("/api/titles/favorites", async (req, res) => {
    
    const query = "SELECT title FROM games WHERE is_favorite = TRUE;"
    const [games] = await pool.execute(query)
    
    return res.status(200).json(games)
})

//get developer

app.get("/api/titles/developer/:developer", async (req, res) => {
    const developer = req.params.developer
    const query = "SELECT title FROM games WHERE developer like ?;"
    const [games] = await pool.execute(query, [`%${developer}%`])
    if (games.length === 0) {
        res.status(404).json({ message: "This developer doesn't exist in the Database!"})
    }
    return res.status(200).json(games)
})

// get publisher

app.get("/api/titles/publisher/:publisher", async (req, res) => {
    const publisher = req.params.publisher
    const query = "SELECT title FROM games WHERE publisher like ?;"
    const [games] = await pool.execute(query, [`%${publisher}%`])
    if (games.length === 0) {
        res.status(404).json({ message: "This publisher doesn't exist in the Database!"})
    }
    return res.status(200).json(games)
})



// get title from statuses

app.get("/api/titles/status/:status", async (req, res) => {
    const status = req.params.status
    const query = "SELECT games.title, statuses.status_name FROM games LEFT JOIN statuses ON statuses.id = games.game_status_id WHERE statuses.status_name like ?;"
    const [games] = await pool.execute(query, [`%${status}%`])
    if (games.length === 0) {
        res.status(404).json({ message: "This status doesn't exist in the Database!"})
    }
    return res.status(200).json(games)
})

// get rating

app.get("/api/titles/rating", async (req, res) => {
    const query = "SELECT title FROM games ORDER BY rating DESC;"
    const [games] = await pool.execute(query)
    
    return res.status(200).json(games)
})

// get launchYear

app.get("/api/titles/launchYear/:launchYear", async (req, res) => {
    const launchYear = req.params.launchYear
    const query = "SELECT title FROM games WHERE launch_year = ?;"
    const [games] = await pool.execute(query, [`%${launchYear}%`])
    if (games.length === 0) {
        res.status(404).json({ message: "This publisher doesn't exist in the Database!"})
    }
    return res.status(200).json(games)
})

// get full game without extras

app.get("/api/titles/game/:game", async (req, res) => {
    const game = req.params.game
    const query = "SELECT games.title, games.developer, games.publisher, games.is_favorite, games.rating, games.notes, games.launch_year, statuses.status_name FROM games JOIN statuses ON statuses.id = games.game_status_id WHERE games.title like ?;"
    const [games] = await pool.execute(query, [`%${game}%`])
    if (games.length === 0) {
        res.status(404).json({ message: "This game doesn't exist in the Database!"})
    }
    return res.status(200).json(games)
})

// get categories

app.get("/api/categories", async (req, res) => {
    
    const query = "SELECT categories.category FROM categories;"
    const [categories] = await pool.execute(query)
    if (categories.length === 0) {
        res.status(404).json({ message: "There are no categories in the Database!"})
    }
    return res.status(200).json(categories)
})

// get titles by categories

app.get("/api/titles/categories/:category", async (req, res) => {
    const category = req.params.category
    const query = "SELECT games.title, categories.category FROM games JOIN game_categories ON game_categories.game_id = games.id JOIN categories ON game_categories.category_id = categories.id WHERE categories.category like ?;"
    const [games] = await pool.execute(query, [`%${category}%`])
    if (games.length === 0) {
        res.status(404).json({ message: "This game doesn't exist in the Database!"})
    }
    return res.status(200).json(games)
})





// get achievements from title and completion rate

// get the first 30 titles and their achievements completion ordered by the DB and be able to skips 30 for pages

// post title, developer, publisher, rating, notes, launch year

// put link categories to specific game

// put change game with title, developer, publisher, favorite, rating, notes, launch year, status

// put favorite of a game

// put status on a game

// delete game from title

// delete achievements from title


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