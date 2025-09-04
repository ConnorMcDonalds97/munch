import requests
import time
from dotenv import load_dotenv
import os
import pprint

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY_")

url = "https://places.googleapis.com/v1/places:searchNearby"
headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "places.id,places.displayName,places.location"
}


def fetch_places_new(location, radius=3000, included_types=["restaurant"]):
    print("here")
    all_places = []
    body = {
        "includedTypes": included_types,
        "maxResultCount":21,
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": location[0] ,
                    "longitude": location[1]
                },
                "radius": float(radius)
            }
        }
    }
    next_page_token = False
    while True:
        response = requests.post(url, headers=headers, json=body)
        data = response.json()
        print("here")
        print(data)
        places = data.get("places", [])
        all_places.extend(places)
        print(data)
        next_page_token = data.get("nextPageToken")
        print(next_page_token)
        if not next_page_token:
            break

        time.sleep(2)
        body["pageToken"] = next_page_token
    
    return all_places
def fetch_places_old(location, radius=3000):
    API_KEY = os.getenv("GOOGLE_API_KEY_")
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": location,
        "radius": float(radius),
        "type": "restaurant",
        "key": API_KEY
    }
    all_places = []

    while True:
        response = requests.get(url, params=params)
        data = response.json()
        all_places.extend(data.get("results", []))

        next_page_token = data.get("next_page_token")
        if not next_page_token:
            break
        time.sleep(2)
        params = {
            "pagetoken": next_page_token,
            "key": API_KEY
        }
    return all_places


location = (53.618278, -113.446093)
restaurants = fetch_places_old("53.600537,-113.496013", radius=200)
pprint.pp(restaurants[0])
'''
print("Total Restaurants Found: ", len(restaurants))
for place in restaurants:
    print(place["name"], place["geometry"]["location"])
'''