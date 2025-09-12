import asyncio
import websockets
import json
import pygame

data = []

#keep listening in the background
async def listen_server(ws):
    global data
    try:
         async for message in ws:
            msg = json.loads(message)
            if msg and msg["Header"] == "List":
                data = msg["Body"]
            elif msg and msg["Header"] == "Match":
                print(f"Match found! Restaurant ID: {msg['Body']}")
            msg = ''
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed")

async def user(name, room):
    uri = f"ws://localhost:8000/ws/{room}"
    async with websockets.connect(uri) as ws:
        global data
        asyncio.create_task(listen_server(ws))
        pygame.init()
        screen = pygame.display.set_mode((400,300))
        pygame.display.set_caption(name)
        clock = pygame.time.Clock()

        restaurant = None
        while True:
            if data:
                restaurant = data.pop()
                print(restaurant)
                while restaurant:

                    choice = None
                    for event in pygame.event.get():
                        if event.type == pygame.QUIT:
                            pygame.quit()
                            return
                        elif event.type == pygame.KEYDOWN:
                            if event.key == pygame.K_a:
                                choice = 'l'
                                print("Left")
                            elif event.key == pygame.K_d:
                                choice = 'r'
                                print("Right")
                    if choice:
                        response = json.dumps({"Header":"Swipe", "Body":[restaurant, choice]})
                        await ws.send(response)
                        restaurant = None
                    clock.tick(30)
                    await asyncio.sleep(0)
                await asyncio.sleep(0)
            await asyncio.sleep(0) #yield control to listener
    pygame.quit()


if __name__ == "__main__":
    user_name = input("Enter Username: ")
    room = input("Enter Room Id: ")
    asyncio.run(user(user_name, room))
