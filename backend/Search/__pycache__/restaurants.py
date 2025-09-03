import requests
import time
from dotenv import load_dotenv
import os
from io import BytesIO
from PIL import Image
import pprint

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

url = "https://places.googleapis.com/v1/places:searchNearby"
headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "places.id,places.displayName,places.location"
}

def fetch_places_new(location, radius=1000, included_types=["restaurant"]):
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
    location = f"{location[0]},{location[1]}"
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

#expensive - don't keep on

#pass the photo_reference
def fetch_photo(reference, api_key, max_width=400, save_as=None):
    url = (
        "https://maps.googleapis.com/maps/api/place/photo"
        f"?maxwidth={max_width}"
        f"&photoreference={reference}"
        f"&key={api_key}"
    )
    
    response = requests.get(url, stream=True)

    if response.status_code == 200:
        image = Image.open(BytesIO(response.content))
        if save_as:
            image.save(save_as)
            print(f"Image saved as {save_as}")
        return image
    else:
        print(f"Error fetching photo: {response.status_code}")
        return None


if __name__ == "__main__":
    location = (53.618278, -113.446093)
    restaurants = fetch_places_old(location, radius=10000)
    print("Total Restaurants Found: ", len(restaurants))
    
    pprint.pprint(restaurants[3])
    #for place in restaurants:
     #   print(place["name"], place["geometry"]["location"])
    
    
    #get image example

    #PHOTO_REF = "ATKogpdW5BuazLa5RAXGPHzjEAVe7M2baTQtfZt1NO9QrmvFSjAOAE188A7CnD8ZgCFOCEa0ARlCRgQlL9m7fH7dvrRP837tFz8cqJXVWU5EBZivIwSCqXmVBJ3WJuoJCX4EtqwoVf571IKtzjHQPuGNLti_I3PdZ1F_yvJ0RbdsO5VLevLHHA1R6X5SJXgZuy4aNSzfjYIGlTHH9pgIFU3imX2OjpYJimq2QEyPZ7pr1YpQTRyvV4goQNrn3gyWLdDVVx-RhMlbRjvgFZgMLCh8tUrCyHkTQ2FDjTJRyRPocJvT8Fa_CULOh0SLa9l5hCoAAySL12mFW94"

    #img = fetch_photo(PHOTO_REF, API_KEY, max_width=700, save_as=None)
    #if img:
    #    img.show()

