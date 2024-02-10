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

/*

app.delete('/issues/:id', async (req, res) => {
  try {
    const issueId = req.params.id;
    await req.db.query(`UPDATE issues SET deleted_flag = 1 WHERE id = ?`, [issueId]);
    res.status(200).json({ success: true, message: ' successfully deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Bad request', data: null });
  }
});

app.get('/issues', async (req, res) => {
  try {
    // Execute a SQL query to retrieve issues from the "issue" table
    const [issues] = await req.db.query(`SELECT * FROM issues WHERE deleted_flag = 0`);

    // Send a JSON response with the retrieved issues
    res.status(200).json({ success: true, message: 'Issues successfully retrieved', data: issues });
  } catch (err) {
    // Handle errors that may occur during the execution of the try block
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

app.get('/issues/:id', async function (req, res) {
  try {
    const issueId = req.params.id;
    const [issue] = await req.db.query('SELECT * FROM issues WHERE id = ? LIMIT 1', [issueId]);

    if (!issue || issue.length === 0) {
      res.status(404).json({ success: false, message: 'Issue not found', data: null });
    } else {
      res.status(200).json({ success: true, message: 'Issue retrieved successfully', data: issue });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

app.post(
  '/issue',
  [
    // Validation middleware
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation error', errors: errors.array() });
      }

      const { title, description } = req.body;

      // Replace Prisma-specific code with MySQL query
      const [newIssue] = await req.db.query('INSERT INTO issues (title, description) VALUES (?, ?)', [
        title,
        description,
      ]);

      res.status(201).json({ success: true, message: 'Issue successfully created', data: newIssue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
  }
);

*/

/* LOGIN DB BELOW 

// Hashes the password and inserts the info into the `user` table
app.post('/register', async function (req, res) {
  try {
    const { password, username } = req.body;

    if (!password || !username) {
      return res.json({ error: 'Username or password is not defined!', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await req.db.query(
      `INSERT INTO user (user_name, password)
      VALUES (:username, :hashedPassword);`,
      { username, hashedPassword }
    );

    const jwtEncodedUser = jwt.sign({ userId: user.insertId, ...req.body }, process.env.JWT_KEY);

    res.json({ jwt: jwtEncodedUser, success: true });
  } catch (error) {
    console.log('error', error);
    res.json({ error, success: false });
  }
});

app.post('/log-in', async function (req, res) {
  try {
    const { username, password: userEnteredPassword } = req.body;
    const [[user]] = await req.db.query(`SELECT * FROM user WHERE user_name = :username`, { username });

    if (!user || !user.password) {
      res.json({ error: 'User or password is not defined!', success: false });
      return;
    }

    const hashedPassword = `${user.password}`;
    const passwordMatches = await bcrypt.compare(userEnteredPassword, hashedPassword);

    if (passwordMatches) {
      const payload = {
        userId: user.id,
        username: user.username,
      };

      const jwtEncodedUser = jwt.sign(payload, process.env.JWT_KEY);

      res.json({ jwt: jwtEncodedUser, success: true });
    } else {
      res.json({ error: 'Invalid password', success: false });
    }
  } catch (err) {
    console.log('Error in /authenticate', err);
  }
});

// Jwt verification checks to see if there is an authorization header with a valid jwt in it.
app.use(async function verifyJwt(req, res, next) {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    res.json('Invalid authorization, no authorization headers');
    return;
  }

  const [scheme, jwtToken] = authHeader.split(' ');

  if (scheme !== 'Bearer') res.json('Invalid authorization, invalid authorization scheme');

  try {
    const decodedJwtObject = jwt.verify(jwtToken, process.env.JWT_KEY);

    req.user = decodedJwtObject;
  } catch (err) {
    console.log(err);
    if (err.message && (err.message.toUpperCase() === 'INVALID TOKEN' || err.message.toUpperCase() === 'JWT EXPIRED')) {
      req.status = err.status || 500;
      req.body = err.message;
      req.app.emit('jwt-error', err, req);
    } else {
      throw (err.status || 500, err.message);
    }
  }

  await next();
});

*/

app.get('/issues', async (req, res) => {
  try {
    // Execute a SQL query to retrieve issues from the "issue" table
    const [issues] = await req.db.query(`SELECT * FROM issues WHERE deleted_flag = 0`);

    // Send a JSON response with the retrieved issues
    res.status(200).json({ success: true, message: 'Issues successfully retrieved', data: issues });
  } catch (err) {
    // Handle errors that may occur during the execution of the try block
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

app.post('/issues', async (req, res) => {
  const { title, description } = req.body;
  const validation = createIssueSchema.safeParse({ title, description });

  if (!validation.success) {
    return res.status(400).json(validation.error);
  }

  const [insert] = await req.db.query(
    `INSERT INTO issues (title, description, createdAt) 
    VALUES (?, ?, CURRENT_TIMESTAMP)`,
    [title, description]
  );

  const [body] = await req.db.query('SELECT * FROM issues WHERE id = ?', [insert.insertId]);

  res.status(201).json({ body });
});

// Start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
