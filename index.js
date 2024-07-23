import express from 'express';
import bodyParser  from 'body-parser';
import {pool} from "./db.js";
import bcrypt from "bcrypt";
import {user_login_schema, user_register_schema} from "./schemas.js"
import { z } from "zod";

const app = express();

// create application/json parser
// create application/x-www-form-urlencoded parser

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(jsonParser);
app.use(urlencodedParser);

// POST/api/users gets JSON bodies
app.post('/api/user/register', async function (req, res)  {

// create user in req.body
    console.log(req.body);
    var {email, name, password} = req.body;
    /*
        {
            "email": "abc@gmail.com",
            "name": "abc",
            "password": "secret",
        }
    */

    // validate request json schema
    const data = user_register_schema.safeParse({
        "email": email,
        "name": name,
        "password": password,
    })

    if(!data.success){
        // handle error
        res.status(403);
        res.send({
            "field_errors": data.error.flatten().fieldErrors,
        });
        return;
    }
    // validate if email is unique
    if ((await pool.query(`SELECT email FROM "user" where email = $1`, [email])).rows.length==1){
        res.status(403)
        res.send({
            "field_errors": {
                "email": [
                    "email already used",
                ],
            }, 
        })
        return;
    }

    // register user
    const query = `INSERT INTO "user"
    ("email", "name", "password", "role")
    VALUES($1, $2, $3, $4);
    `;

    const hashed_password = await bcrypt.hash(password, 10);
    
    const role = "USER";
    await pool.query(query,[email, name, hashed_password, role]);

    res.send({
        message:"success"
    })
})

// login_user
app.post("/api/user/login",  async function(req,res){
    console.log(req.body);
    var {email,password} = req.body;


    const data = user_login_schema.safeParse(
      {
        "email":email,
        "password":password,
      }
    )
    
    if(!data.success){
        res.status(403);
        res.send({
            fieldErrors:data.error.flatten().fieldErrors
        })
        return;
    }

    const user = await pool.query(`Select email, password from user where email is $1`, [email])

    // check if email exists
    if(user.rows.length==0){
      res.status(403);
      res.send({
         "form_errors":[
            "email or password is wrong!",
         ]
      })
        return;
    }

    // check if password is correct
    console.log(user.rows[0]);
    if(!bcrypt.compare(password, user.rows[0].password)){
        res.status(403);
        res.send({
            "form_errors":[
                "email or password is wrong!",
            ]
        })
        return;
    }

    // login the user
    // JWT or Session based login

// CHAT GPT
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { Pool } = require('pg');

// const app = express();
// const port = 3000;
// const SECRET_KEY = 'your-secret-key';

// // Configure PostgreSQL pool
// const pool = new Pool({
//   user: 'your_database_user',
//   host: 'your_database_host',
//   database: 'your_database_name',
//   password: 'your_database_password',
//   port: 5432,
// });

// app.use(bodyParser.json());

// // User registration route
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
//       [username, hashedPassword]
//     );
//     res.status(201).json({ userId: result.rows[0].id });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// User login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected route example
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// CHAT GPT






})


app.get("/",(req, res)=>{
    res.send("<h1>Hi Anuj</h1>")
})


// app.post("/booking")
// app.post("/login")
// app.post("/dashboard")
// app.post("/profile")

// admin endpoints






const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});