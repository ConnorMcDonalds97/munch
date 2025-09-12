import psycopg2
from psycopg2.extras import execute_values
import numpy as np
import os
from dotenv import load_dotenv
import math

DISTANCE_LIMIT = 5000 #meters
T = 0.2 #temperature for softmax

def select_restaurants(location_center, radius=5000):
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
            SELECT restaurant_name, restaurants.restaurant_id, address, rating, rating_number, price_level, location_id, 
                ST_Distance(location, ST_MakePoint(%s, %s)::geography) AS distance_meters
            FROM restaurants 
            JOIN restaurant_location ON restaurant_location.restaurant_id = restaurants.restaurant_id
            WHERE ST_DWithin(
                location,
                ST_MakePoint(%s, %s)::geography,
                %s
            )
            AND rating IS NOT NULL
            AND rating_number IS NOT NULL
            ORDER BY location <-> ST_MakePoint(%s, %s)::geography;
            """
    curr.execute(query, (location_center[0], location_center[1], location_center[0], location_center[1], radius, location_center[0], location_center[1]))
    result = curr.fetchall()
    return result

def score(rating, rating_number, distance):
    return float(rating) * math.log(1+rating_number)/math.log(1 + 1000) - distance/DISTANCE_LIMIT

def softmax(restaurants):
    scores = []

    scores = [math.e**(score(r[3], r[4], r[7])/T) for r in restaurants]
    sum_scores = sum(scores)
    probabilities = [s/sum_scores for s in scores]
    return probabilities
def reorder(restaurants, indexes):
    new_list = np.copy(restaurants)
    
    j = len(restaurants)-1
    for i in indexes:
        new_list[j] = restaurants[i]
        j -= 1
    return new_list


def fetch_restaurants(user_location = (-113.5319,53.52), radius = 5000):
    restaurants = select_restaurants(user_location, radius=radius)
    probs = softmax(restaurants)
    indexes = [i for i in range(len(restaurants))]
    
    new_order = np.random.choice(indexes, size=len(restaurants), replace=False, p=probs)
    
    restaurants = reorder(restaurants, new_order)

    return restaurants.tolist()
    

if __name__ == "__main__":
    print(fetch_restaurants())