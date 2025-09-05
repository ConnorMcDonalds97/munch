import map
import restaurants
import psycopg2
from psycopg2.extras import execute_values
import os
from dotenv import load_dotenv
import pprint


EDMONTON = ((53.392, -113.719), (53.72, -113.270719))

def upload_restaurant(conn, restaurant):
    with conn.cursor() as cur: # create cursor
        #round lat and lng to 6 decimals
        lat = round(restaurant['geometry']['location']['lat'], 6)
        lng = round(restaurant['geometry']['location']['lng'],6)

        # check if restaurant already exist else add it
        cur.execute (
            "SELECT restaurant_id FROM restaurants WHERE restaurant_name = %s",
            (restaurant['name'],)
        )
        row = cur.fetchone()

        if row:
            restaurant_id = row[0]
        else:
            cur.execute(
                "INSERT INTO restaurants (restaurant_name) VALUES (%s) RETURNING restaurant_id",
                (restaurant['name'],)
            )
            restaurant_id = cur.fetchone()[0]
        
        #check if location exists else add it

        cur.execute(
            """
            SELECT location_id FROM restaurant_location
            WHERE restaurant_id = %s AND latitude = %s AND longitude = %s
            """, 
            (restaurant_id, lat, lng)
        )
        row = cur.fetchone()

        if row:
            location_id = row[0]
        else:
            cur.execute(
                """
                INSERT INTO restaurant_location (restaurant_id, address, latitude, longitude, rating, rating_number, price_level, google_place_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (restaurant_id, latitude, longitude)
                DO NOTHING
                RETURNING location_id
                """,
                (restaurant_id, restaurant['vicinity'], lat, lng, restaurant.get('rating'), restaurant.get('user_ratings_total'), restaurant.get('price_level'), restaurant.get('place_id'))
            )
            row = cur.fetchone()
            if row:
                location_id = row[0]
            else:
                cur.execute(
                    """
                    SELECT location_id FROM restaurant_location 
                    WHERE restaurant_id = %s AND latitude = %s AND longitude = %s
                    """,
                    (restaurant_id, 
                    lat,
                    lng)
                )
                row = cur.fetchone()
                if not row:
                    raise Exception(
                        f"Could not find or insert location for restaurant_id={restaurant_id}, "
                        f"name={restaurant['name']}, "
                        f"lat={lat}, "
                        f"lng={lng}"
                    )
                location_id = row[0]


        #add photo
        if 'photos' in restaurant:
            for photo in restaurant['photos']:
                cur.execute(
                    """
                    INSERT INTO restaurant_photo (location_id, photo_reference, height, width)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                    """,
                    (location_id, photo['photo_reference'], photo.get('height'), photo.get('width'))
                )
        
        #commit
        conn.commit()

        return {'restaurant_id': restaurant_id, 'location_id': location_id}
        
def upload_area(coords, step = 1.0, radius = 1000):
    #load credentials from database
    load_dotenv()
    DB_NAME = os.getenv("DB_NAME")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD") 

    conn = psycopg2.connect(
        dbname= DB_NAME,
        user= DB_USER, 
        password= DB_PASSWORD,
        host= DB_HOST,
        port= DB_PORT
    )    
    print("CONNECTION MADE")

    EDMONTON = coords #boundary box of Edmonton
    grid_points = map.generate_grid(EDMONTON[1], EDMONTON[0], step=step)


    restaurants_found = 0 #update this with how many UNIQUE restaurants we store
    alert = [] #store locations that are crowded -> manually check
    total_points = len(grid_points)

    counter = 1
    for point in grid_points:
        print(f"point {counter}/{total_points}")
        counter += 1

        rests = restaurants.fetch_places_old(point, radius=radius)
        
        restaurants_located = len(rests)
        if restaurants_located >= 60:
            alert.append(point)


        for restaurant in rests:
            print(upload_restaurant(conn, restaurant))
            restaurants_found += 1
        print("_____________________")
        print("RESTAURANTS UPLOADED ", restaurants_found)
        print("_____________________")

    if len(alert) > 0:
        print("POPULATED AREAS (MAX FOUND): ", alert)
        
if __name__ == "__main__":

    point = ((53.423932,-113.488439),(53.432932,-113.470456)) 
    upload_area(point, step=0.2, radius=200)
    
    #upload_area(EDMONTON)