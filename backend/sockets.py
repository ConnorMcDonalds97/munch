import asyncio

async def fetch_data():
    await asyncio.sleep(2)
    return "data"

async def main():
    task = asyncio.create_task(fetch_data())
    await asyncio.sleep(2)
    print("doing other stuff while waiting")
    data = await task
    print(data)

asyncio.run(main())