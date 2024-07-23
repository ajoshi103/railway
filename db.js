import dotenv from 'dotenv';
// import {Pool} from "pg";
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const pool = new Pool(dbConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

process.on('uncaughtException', (err) => {
	console.error('There was an uncaught error', err);
	process.exit(1); // mandatory (as per the Node.js docs)
  });

process.on('SIGINT', () => {
  pool.end(() => {
    console.log('pool has ended');
    process.exit(0);
  });
});

export {pool};
