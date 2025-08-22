import asyncio
import websockets
import json

async def fake_user(name, room):
    uri = f"ws://localhost:8000/ws/{room}"
    async with websockets.connect(uri) as ws:
        print(f"{name} connected to room {room}")

        # Receive initial restaurant list
        msg = await ws.recv()
        msg_data = json.loads(msg)
        restaurants = msg_data["Body"]["restaraunts"]
        print(f"Restaurants to swipe on: {restaurants}")

        while restaurants:
            rest = restaurants.pop(0)
            print(f"Restaurant: {rest}")
            choice = input("Swipe left or right? (l/r): ").strip().lower()

            message = json.dumps({
                "Header": "Swipe",
                "Body": [rest, choice]
            })
            await ws.send(message)

            # Listen for updates/matches from server (non-blocking with timeout)
            try:
                resp = await asyncio.wait_for(ws.recv(), timeout=2)
                resp_data = json.loads(resp)
                if resp_data["Header"] == "Match":
                    print(f"*** MATCH FOUND! Restaurant: {resp_data['Body']} ***")
                    break
                else:
                    print(f"Received update: {resp_data}")
            except asyncio.TimeoutError:
                # No message received, continue swiping
                pass

        print("No more restaurants or match found. Closing connection.")

if __name__ == "__main__":
    user = input("Enter your username: ")
    room = input("Enter room id: ")
    asyncio.run(fake_user(user, room))
