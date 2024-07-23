import { pool } from "./db.js";


const user_defined_types_statement = `
create type user_role as enum (
  'ADMIN',
  'USER'
);
`;

const create_statements   = `

CREATE TABLE if not exists "user"(
	email TEXT PRIMARY KEY,
	name TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE,
    role user_role
);

CREATE TABLE if not exists "station"(
    code TEXT PRIMARY KEY,  
    name TEXT not null
);

CREATE TABLE if not exists "train"(
    name TEXT PRIMARY KEY,
    total_seats INTEGER,
    source_station TEXT,
    destination_station TEXT,
    FOREIGN KEY (source_station) REFERENCES "station" (code)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (destination_station) REFERENCES "station" (code)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);

CREATE TABLE if not exists "booking"(

    email text NOT NULL,
    source_station TEXT,
    destination_station TEXT,
    FOREIGN KEY (email) REFERENCES "user" (email)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (source_station) REFERENCES "station" (code)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (destination_station) REFERENCES "station" (code)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);
`

const drop_statements = `
drop table if exists "booking";
drop table if exists "train";
drop table if exists "station";
drop table if exists "user";
`

async function init_db(){

    try{
        await pool.query(user_defined_types_statement);
    }
    catch(e){
        // console.log(e);
    }

    await pool.query(drop_statements);
    await pool.query(create_statements);
}

init_db()