import asyncio
import websockets
import json


async def fake_user(name, room):
    uri = f"ws://localhost:8000/ws/{room}"
    async with websockets.connect(uri) as ws:
        msg = await ws.recv()
        msg = json.loads(msg)
        data = []

        while True:
            if msg and msg["Header"] == "List":
                data = msg["Body"]['restaraunts']
                msg = ''
            elif msg and msg["Header"] == "Action":
                 pass
            if (not len(data)):
                print("No data")
            else:
                rest = data.pop()
                print("Restaraunt: ", rest)
                choice = input("Swipe left or right? (l or r)")
                response = json.dumps({"Header":"Swipe", "Body":[rest, choice]})
                await ws.send_text(response)
                await msg = ws.recv()
                msg = json.loads(msg)
            await asyncio.sleep(1)

if __name__ == "__main__":
    user = input("Enter Username: ")
    room = input("Enter Room Id: ")
    asyncio.run(fake_user(user, room))