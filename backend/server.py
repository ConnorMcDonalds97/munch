from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import uvicorn
import json

app = FastAPI()
rooms = {} #{room_id : {users : [webSocket, webSocket, ...], choices : { rest1 : []}}}

rests = ["Pizza Place", "Sushi Bar", "Burger Joint"]
restaurants = json.dumps({"Header":"List", "Body":{"restaurants":rests}})

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    if room_id not in rooms:
        rooms[room_id]["users"] = []
        rooms[room_id]["choices"] = {}
    rooms[room_id]["users"].append(websocket)

    try:
        await websocket.send_text(restaurants)
        #handle when online
        while True:
            response = await websocket.receive_text()
            response = json.loads(response)
            if response["Header"] == "Swipe" and response["Body"][1] == "r":
                rest = response["Body"][0]
                if rest not in rooms[room_id]["choices"]:
                    rooms[room_id]["choices"][rest] = []
                rooms[room_id]["choices"][rest].append(1)

            for conn in rooms[room_id]:
                if conn != websocket:
                    await conn.send_text(data)
    except WebSocketDisconnect:
        #handle if user leaves
        rooms[room_id].remove(websocket)
        if not rooms[room_id]:
            del rooms[room_id]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
