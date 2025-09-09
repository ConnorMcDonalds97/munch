def generate_grid(top_right, bottom_left, step = 1.0):
    grid = []
    
    y = bottom_left[0]
    increment = step/111.32 #conversion ratio 111.32 lat = 1 km
    while y < top_right[0]:
        x = bottom_left[1]
        y += increment
        while x < top_right[1]:
            x += increment
            grid.append((round(y,6),round(x,6)))
    return grid


if __name__ == "__main__":
    EDMONTON = ((53.392, -113.719), (53.72, -113.270719)) #boundary box of Edmonton

    for point in generate_grid(EDMONTON[1], EDMONTON[0]):
        print(point, end="\n")
 