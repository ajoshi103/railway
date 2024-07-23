import psycopg2



# create_statement = """Create table Railway(
             
# );
# """
user_defined_types_statement = """
create type user_role as enum (
  'ADMIN',
  'USER'
);
"""

create_statements   = """

CREATE TABLE if not exists "user"(
	email TEXT PRIMARY KEY,
	name TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE,
    roll user_role
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
"""


conn = psycopg2.connect("host=localhost port=5432 user=test_user password=123 dbname=db")
curr = conn.cursor()

# curr.execute(user_defined_types_statement)
curr.execute(create_statements)


# curr.execute(insert_statement)
# curr.execute(select_statement)
# columns = curr.
# data = curr.fetchall()


# conn.commit()