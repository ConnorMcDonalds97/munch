from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import uvicorn
import json

app = FastAPI()
rooms = {}  # { room_id: { "users": [websocket, ...], "choices": {rest_name: [1, 1, 0]}, "users_map": {websocket: user_id} } }

rests = ["Pizza Place", "Sushi Bar", "Burger Joint"]
restaurants_message = json.dumps({"Header": "List", "Body": {"restaraunts": rests}})

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    if room_id not in rooms:
        rooms[room_id] = {"users": [], "choices": {}, "users_map": {}}
    rooms[room_id]["users"].append(websocket)

    # Optionally assign user id or use connection as key
    rooms[room_id]["users_map"][websocket] = len(rooms[room_id]["users"])

    try:
        # Send initial restaurants list to new user
        await websocket.send_text(restaurants_message)

        while True:
            response = await websocket.receive_text()
            data = json.loads(response)

            if data["Header"] == "Swipe":
                rest = data["Body"][0]
                choice = data["Body"][1]  # 'l' or 'r'

                if rest not in rooms[room_id]["choices"]:
                    rooms[room_id]["choices"][rest] = []

                # Store 1 for right swipe, 0 for left swipe
                rooms[room_id]["choices"][rest].append(1 if choice == "r" else 0)

                # Check if all users swiped on this restaurant
                if len(rooms[room_id]["choices"][rest]) == len(rooms[room_id]["users"]):
                    # If all swiped right -> match!
                    if all(v == 1 for v in rooms[room_id]["choices"][rest]):
                        match_msg = json.dumps({"Header": "Match", "Body": rest})
                        # Broadcast match to all users in the room
                        for conn in rooms[room_id]["users"]:
                            await conn.send_text(match_msg)
                    else:
                        # No match, you can send next restaurant or just continue
                        pass

            # Broadcast the swipe to other users (optional)
            for conn in rooms[room_id]["users"]:
                if conn != websocket:
                    await conn.send_text(response)

    except WebSocketDisconnect:
        # Remove disconnected user
        rooms[room_id]["users"].remove(websocket)
        del rooms[room_id]["users_map"][websocket]

        # If room empty, clean up
        if not rooms[room_id]["users"]:
            del rooms[room_id]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
