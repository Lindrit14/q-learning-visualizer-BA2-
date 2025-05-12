# python/generate_maze.py
import random
import json
import sys

def carve(x, y, maze, width, height):
    dirs = [(2,0),(-2,0),(0,2),(0,-2)]
    random.shuffle(dirs)
    for dx, dy in dirs:
        nx, ny = x + dx, y + dy
        # prüfen, ob Ziel im Inneren liegt und noch unberührt (Wand)
        if 1 <= nx < width-1 and 1 <= ny < height-1 and maze[ny][nx] == 1:
            # entferne Wand dazwischen
            maze[y + dy//2][x + dx//2] = 0
            maze[ny][nx] = 0
            carve(nx, ny, maze, width, height)

def generate_maze(cell_count):
    # wir erzeugen intern ein (2*Zellen+1)x(2*Zellen+1)-Grid mit Wänden
    width  = cell_count * 2 + 1
    height = cell_count * 2 + 1
    maze = [[1]*width for _ in range(height)]

    # Startpunkt in (1,1)
    maze[1][1] = 0
    carve(1, 1, maze, width, height)

    # Öffnung für Start/Exit
    maze[0][1] = 0                  # Eingang oben
    maze[height-1][width-2] = 0     # Ausgang unten

    return maze

if __name__ == "__main__":
    try:
        n = int(sys.argv[1])
        if not (3 <= n <= 25):
            raise ValueError
    except:
        print(json.dumps({"error":"Size must be integer 3–25"}))
        sys.exit(1)

    maze = generate_maze(n)
    print(json.dumps(maze))
