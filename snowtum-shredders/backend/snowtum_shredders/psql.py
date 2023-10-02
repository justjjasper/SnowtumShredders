# This seed file is a combination of a index.js(Configuration file) and a schema.sql file
import psycopg2
from psycopg2 import sql

# Import environmental variables
import os
from dotenv import load_dotenv
load_dotenv()

PG_USER = os.getenv('PG_USER')
PG_PASSWORD = os.getenv('PG_PASSWORD')
PG_HOST = os.getenv('PG_HOST')
PG_DATABASE = os.getenv('PG_DATABASE')
PG_PORT = os.getenv('PG_PORT')


# Database connection parameters
db_params = {
  'dbname': PG_DATABASE,
  'user': PG_USER,
  'password': PG_PASSWORD,
  'host': PG_DATABASE,
  'port': PG_PORT,
}

create_table_sql = '''
CREATE TABLE IF NOT EXISTS snowboards (
  snowboard_id PRIMARY KEY NOT NULL,
  snowboard_name VARCHAR(255) NOT NULL,
  header_image VARCHAR(255) NOT NULL,
  header_description VARCHAR(255) NOT NULL,
  snowboard_price INTEGER NOT NULL,
  shape VARCHAR(255) NOT NULL,
  sidecut VARCHAR(255) NOT NULL,
  flex VARCHAR(255) NOT NULL,
  rider_type VARCHAR(255) NOT NULL,
  tech_story VARCHAR(255) NOT NULL,
  camber_type VARCHAR(255) NOT NULL,
  camber_description VARCHAR(255) NOT NULL,
  camber_image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS snowboard_images (

);

'''