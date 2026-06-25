GameTracker Installation Guide
==============================

This guide explains how to install and run the GameTracker app from GitHub.

Requirements:

Node.js
MySQL Server


Install Backend Dependencies
----------------------------

Go to the server folder:

cd server

Install packages:

npm install


Create The Database
-------------------

Open MySQL and run the SQL file:

DB.sql

This creates the database and tables.

You can add data with:

data.sql

Configure Backend Environment Variables
---------------------------------------

Inside the server folder, change the file called env.example to .env:


Replace the values with your MySQL information on here:

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=game_tracker



Run The Backend
---------------

Inside the server folder, run:

npm run dev

The backend should run on:

http://localhost:3000

Install Frontend Dependencies
-----------------------------

Open another terminal.

Go to the frontend folder:

cd frontend

Install packages:

npm install


Run The Frontend
----------------

Inside the frontend folder, run:

npm run dev

The frontend should run on:

http://localhost:5173
(keep the server, the DB and the frontend running)

Using The App
-------------

Open this URL in the browser:

http://localhost:5173