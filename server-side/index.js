import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import { validationResult, check } from 'express-validator';
dotenv.config(); // Allows us to access the .env
import { z } from 'zod';

const app = express();
const port = process.env.PORT; // default port to listen

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const corsOptions = {
  origin: '*',
  credentials: true,
  'access-control-allow-credentials': true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Makes Express parse the JSON body of any requests and adds the body to the req object
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    // Connecting to our SQL db. req gets modified and is available down the line in other middleware and endpoint functions
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
    await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
    await req.db.query(`SET time_zone = '-8:00'`);

    // Moves the request on down the line to the next middleware functions and/or the endpoint it's headed for
    await next();

    // After the endpoint has been reached and resolved, disconnects from the database
    req.db.release();
  } catch (err) {
    // If anything downstream throw an error, we must release the connection allocated for the request
    console.log(err);
    // If an error occurs, disconnects from the database
    if (req.db) req.db.release();
    throw err;
  }
});

app.get('/issues', async (req, res) => {
  try {
    // Execute a SQL query to retrieve issues from the "issue" table
    const [issues] = await req.db.query(`SELECT * FROM issues WHERE deleted_flag = 0 ORDER BY id DESC`);

    // Send a JSON response with the retrieved issues
    res.status(200).json({ issues });
  } catch (err) {
    // Handle errors that may occur during the execution of the try block
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

app.get('/issues/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid issue ID' });
  }

  try {
    // Execute a SQL query to retrieve the issue with the specified ID
    const [issueRows] = await req.db.query('SELECT * FROM issues WHERE id = ?', [id]);

    // Check if the result is null or empty
    if (!issueRows || issueRows.length === 0) {
      // If no issue was found, return a 404 response
      res.status(404).json({ success: false, message: 'Issue not found' });
    } else {
      // If an issue was found, return it as the response
      const issue = issueRows[0]; //Returns a single object instead of an
      console.log('get(/issues/:id)', issue);
      res.status(200).json(issue);
    }
  } catch (error) {
    // Handle any errors that occur during the execution of the query
    console.error('Error fetching issue:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/issues/new', async (req, res) => {
  const { title, description } = req.body;

  const [insert] = await req.db.query(
    `INSERT INTO issues (title, description, createdAt) 
    VALUES (?, ?, CURRENT_TIMESTAMP)`,
    [title, description]
  );

  const [body] = await req.db.query('SELECT * FROM issues WHERE id = ?', [insert.insertId]);

  console.log("post('/issues/new')", body);

  res.status(201).json({ body });
});

app.patch('/issues/:id/edit', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid issue ID' });
  }

  const [update] = await req.db.query('UPDATE issues SET title = ?, description = ?, updatedAt = NOW() WHERE id = ?', [
    title,
    description,
    id,
  ]);

  if (update.affectedRows === 0) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }

  const [issue] = await req.db.query('SELECT * FROM issues WHERE id = ?', [id]);
  console.log('/issues/:id/edit', issue);

  res.status(200).json({ issue });
});

app.delete('/issues/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid issue ID' });
  }

  const [update] = await req.db.query('UPDATE issues SET deleted_flag = 1 WHERE id = ?', [id]);

  //Checks the number of rows affected by the SQL operation
  if (update.affectedRows === 0) {
    return res.status(404).json({ success: false, message: 'Issue not found' });
  }

  res.status(204).json({ success: true, message: 'Issue deleted' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
