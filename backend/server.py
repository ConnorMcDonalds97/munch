import score
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import uvicorn
import json
from decimal import Decimal

app = FastAPI()
rooms = {} #{room_id: {users: [webSocket, ...], choices : {rest1_id : counter, rest2_id : counter, ..} }}

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    if room_id not in rooms:
        rooms[room_id] = {"users": [], "choices": {}}
    rooms[room_id]["users"].append(websocket)

    try:
        #send initial list of restaurants
        await websocket.send_text(json.dumps(
            {"Header": "List", "Body": score.fetch_restaurants()},
            default=lambda x: float(x) if isinstance(x, Decimal) else x
        ))

        while True: #online logic
            match = None

            #wait for a response -> either swipe or user needs more restaurants
            response = await websocket.receive_text()
            response = json.loads(response)

            if response["Header"] == "Swipe":
                restaurant_id = response["Body"][0][0]
                
                if restaurant_id not in rooms[room_id]["choices"]:
                    rooms[room_id]["choices"][restaurant_id] = 0
                if response["Body"][1] == "r":
                    counter = rooms[room_id]["choices"][restaurant_id]
                    counter += 1
                    if counter >= (len(rooms[room_id]["users"])//2 + 1):
                        for connection in rooms[room_id]["users"]:
                            print("Match found, sending to user")
                            await connection.send_text(json.dumps({"Header": "Match", "Body": restaurant_id}))
                    rooms[room_id]["choices"][restaurant_id] = counter

    except WebSocketDisconnect:
        rooms[room_id]["users"].remove(websocket)
        if not rooms[room_id]["users"]:
            del rooms[room_id]

        
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port = 8000)