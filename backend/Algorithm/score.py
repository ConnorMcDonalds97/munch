import psycopg2
from psycopg2.extras import execute_values
import os
from dotenv import load_dotenv
import math

DISTANCE_LIMIT = 5000 #meters

def select_restaurants(location_center, radius=10000):
    load_dotenv()
    conn = psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )
    curr = conn.cursor()
    query = """
SELECT restaurant_name, restaurants.restaurant_id, address, rating,
       ST_Distance(location, ST_MakePoint(%s, %s)::geography) AS distance_meters
FROM restaurants 
JOIN restaurant_location ON restaurant_location.restaurant_id = restaurants.restaurant_id
WHERE ST_DWithin(
    location,
    ST_MakePoint(%s, %s)::geography,
    %s
)
ORDER BY location <-> ST_MakePoint(%s, %s)::geography;
"""
    curr.execute(query, (location_center[0], location_center[1], location_center[0], location_center[1], radius, location_center[0], location_center[1]))
    result = curr.fetchall()
    print(result)

def score(rating, rating_number, distance):
    return rating * math.log(1+rating_number)/math.log(1 + 1000) - distance/DISTANCE_LIMIT

def main():
    user_location = (53.52,-113.5319) #lat, lng
    select_restaurants(user_location, radius=5000)

if __name__ == "__main__":
    main()