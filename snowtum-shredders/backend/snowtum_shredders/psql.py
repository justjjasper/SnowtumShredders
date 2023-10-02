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
  'host': PG_HOST,
  'port': PG_PORT,
}

create_tables_sql = '''
CREATE TABLE IF NOT EXISTS snowboards (
  snowboard_id INTEGER PRIMARY KEY NOT NULL,
  snowboard_name VARCHAR(255) NOT NULL,
  header_image VARCHAR(255) NOT NULL,
  header_description TEXT NOT NULL,
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
  snowboard_image_id INTEGER PRIMARY KEY NOT NULL,
  snowboard_id INTEGER NOT NULL,
  snowboard_image VARCHAR(255) NOT NULL,
  FOREIGN KEY (snowboard_id) REFERENCES snowboards(snowboard_id)
);

CREATE TABLE IF NOT EXISTS snowboard_reviews (
  review_id SERIAL PRIMARY KEY NOT NULL,
  snowboard_id INTEGER NOT NULL,
  snowboard_review_title VARCHAR(255) NOT NULL,
  snowboard_review_author VARCHAR(255) NOT NULL,
  snowboard_review_date DATE NOT NULL,
  snowboard_review_body TEXT NOT NULL,
  snowboard_review_rating INTEGER NOT NULL,
  FOREIGN KEY (snowboard_id) REFERENCES snowboards(snowboard_id)
);

CREATE TABLE IF NOT EXISTS snowboard_skus (
  snowboard_sku_id INTEGER PRIMARY KEY NOT NULL,
  snowboard_id INTEGER NOT NULL,
  snowboard_size NUMERIC NOT NULL,
  snowboard_sku NUMERIC NOT NULL,
  FOREIGN KEY (snowboard_id) REFERENCES snowboards(snowboard_id)
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
  FOREIGN KEY (tshirt_id) REFERENCES tshirts(tshirt_id)
);

CREATE TABLE IF NOT EXISTS hoodies (
  hoodie_id INTEGER PRIMARY KEY NOT NULL,
  hoodie_name VARCHAR(255) NOT NULL,
  hoodie_price NUMERIC NOT NULL,
  hoodie_image VARCHAR(255) NOT NULL,
  hoodie_description TEXT
);

CREATE TABLE IF NOT EXISTS hoodie_skus (
  hoodie_sku_id INTEGER PRIMARY KEY NOT NULL,
  hoodie_id INTEGER NOT NULL,
  hoodie_size VARCHAR(255) NOT NULL,
  hoodie_sku NUMERIC NOT NULL,
  FOREIGN KEY (hoodie_id) REFERENCES hoodies(hoodie_id)
);

CREATE TABLE IF NOT EXISTS headgear (
  headgear_id INTEGER PRIMARY KEY NOT NULL,
  headgear_name VARCHAR(255) NOT NULL,
  headgear_image VARCHAR(255) NOT NULL,
  headgear_price NUMERIC NOT NULL,
  headgear_description TEXT,
  headgear_sku NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS boardbag (
  boardbag_id INTEGER PRIMARY KEY NOT NULL,
  boardbag_name VARCHAR(255) NOT NULL,
  boardbag_price NUMERIC NOT NULL,
  boardbag_size VARCHAR(255),
  boardbag_description TEXT,
  boardbag_sku NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS boardbag_images (
  boardbag_image_id INTEGER PRIMARY KEY NOT NULL,
  boardbag_id INTEGER NOT NULL,
  boardbag_image VARCHAR(255) NOT NULL,
  FOREIGN KEY (boardbag_id) REFERENCES boardbag(boardbag_id)
);

CREATE INDEX snowboard_images_snowboard_id_index ON snowboard_images(snowboard_id);
CREATE INDEX snowboard_reviews_snowboard_id_index ON snowboard_reviews(snowboard_id);
CREATE INDEX snowboard_skus_snowboard_id_index ON snowboard_skus(snowboard_id);
CREATE INDEX tshirt_skus_tshirt_id_index ON tshirt_skus(tshirt_id);
CREATE INDEX hoodie_skus_hoodie_id_index ON hoodie_skus(hoodie_id);
CREATE INDEX boardbag_images_boardbag_id_index ON boardbag_images(boardbag_id);
'''

# Function to execute PSQL Statements
def execute_sql(connection, sql_query):
  with connection.cursor() as cursor:
    cursor.execute(sql_query)
    connection.commit()

try:
  # Connect to PostgreSQL Database
  conn = psycopg2.connect(**db_params)

  execute_sql(conn, create_tables_sql)

except psycopg2.Error as e:
  print('Error connecting/creating tables to PSQL', e)

finally:
  if conn:
    conn.close()
