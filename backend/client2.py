import asyncio
import websockets
import json
import pygame

async def user(name, room):
    uri = f"ws://localhost:8000/ws/{room}"
    async with websockets.connect(uri) as ws:
        msg = await ws.recv()
        msg = json.loads(msg)
        data = []
        if msg and msg["Header"] == "List":
            data = msg["Body"]

        pygame.init()
        screen = pygame.display.set_mode((400,300))
        pygame.display.set_caption("Swipe Demo")
        clock = pygame.time.Clock()
        
        if data:
            restaurant = data[-1]
            print(restaurant)
        while data:
            choice = None
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    return
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_a:
                        choice = 'l'
                    elif event.key == pygame.K_d:
                        choice = 'r'            
            if choice:
                data.pop()
                restaurant = data[-1]
                print(restaurant)
            
            clock.tick(30)
    pygame.quit()
if __name__ == "__main__":
    us = input("Enter Username: ")
    room = input("Enter Roomo id: ")
    asyncio.run(user(us, room))
