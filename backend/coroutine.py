import asyncio


async def pr(val, time):
    await asyncio.sleep(time)
    print(val)
    return val
async def pr2(val):
    print("VAL IS ",val)
async def main():
    task1 = asyncio.create_task(pr(1,5))
    task2 = asyncio.create_task(pr(2,1))
    res1 = await task1
    res2 = await task2
    task3 = asyncio.create_task(pr2(res2))
    await task3
asyncio.run(main())