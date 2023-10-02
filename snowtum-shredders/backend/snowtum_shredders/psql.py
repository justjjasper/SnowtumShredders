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
  tech_story TEXT NOT NULL,
  camber_type VARCHAR(255) NOT NULL,
  camber_description TEXT NOT NULL,
  camber_image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS snowboard_images (
  snowboard_image_id PRIMARY KEY NOT NULL,
  snowboard_id INTEGER NOT NULL,
  snowboard_image VARCHAR(255) NOT NULL,
  FOREIGN KEY (snowboard_id) REFERENCES snowboards(snowboard_id),
  INDEX (snowboard_id)
);

CREATE TABLE IF NOT EXISTS snowboard_reviews (
  review_id SERIAL PRIMARY KEY NOT NULL,
  snowboard_id INTEGER NOT NULL,
  snowboard_review_title VARCHAR(255) NOT NULL,
  snowboard_review_author VARCHAR(255) NOT NULL,
  snowboard_review_date DATE NOT NULL,
  snowboard_review_body TEXT NOT NULL,
  FOREIGN KEY (snowboard_id) REFERENCES snowboards(snowboard_id),
  INDEX (snowboard_id)
);

CREATE TABLE IF NOT EXISTS snowboard_skus (
  snowboard_sku_id INTEGER PRIMARY KEY NOT NULL,
  snowboard_id INTEGER NOT NULL,
  snowboard_size NUMERIC NOT NULL,
  snowboard_sku NUMERIC NOT NULL,
  FOREIGN KEY (snowboard_id) REFERENCES snowboards(snowboard_id),
  INDEX (snowboard_id)
);

CREATE TABLE IF NOT EXISTS tshirts (
  tshirt_id INTEGER PRIMARY KEY NOT NULL,
  tshirt_name VARCHAR(255) NOT NULL,
  tshirt_price NUMERIC NOT NULL,
  tshirt_image VARCHAR(255) NOT NULL,
  tshirt_description TEXT
);

CREATE TABLE IF NOT EXISTS tshirt_skus (
  tshirt_sku_id INTEGER PRIMARY KEY NOT NULL,
  tshirt_id INTEGER NOT NULL,
  tshirt_size VARCHAR(255) NOT NULL,
  tshirt_sku NUMERIC NOT NULL,
  FOREIGN KEY (tshirt_id) REFERENCES tshirts(tshirt_id),
  INDEX (tshirt_id)
);


'''
