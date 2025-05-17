#!/usr/bin/env python3
import sys, json, random
import numpy as np
from generate_maze import generate_maze

class MazeEnv:
    MOVES = [(0,-1),(1,0),(0,1),(-1,0)]
    def __init__(self, maze):
        self.maze = maze
        h, w = len(maze), len(maze[0])
        self.start = (1,0)
        self.goal  = (w-2,h-1)
    def reset(self):
        self.pos = self.start
        return self.pos
    def step(self, a):
        dx,dy = MazeEnv.MOVES[a]
        x,y = self.pos
        nx,ny = x+dx, y+dy
        if 0<=ny<len(self.maze) and 0<=nx<len(self.maze[0]) and self.maze[ny][nx]==0:
            self.pos = (nx,ny)
        reward = 100.0 if self.pos==self.goal else -1.0
        done = self.pos==self.goal
        return self.pos, reward, done

class QLearner:
    def __init__(self, α=0.1, γ=0.99,ε=1.0,ε_min=0.01,ε_decay=0.995):
        self.Q, self.α, self.γ, self.ε, self.ε_min, self.ε_decay = {},α,γ,ε,ε_min,ε_decay
    def get(self,s):
        if s not in self.Q: self.Q[s]=np.zeros(4)
        return self.Q[s]
    def choose(self,s):
        if random.random()<self.ε: return random.randrange(4)
        return int(np.argmax(self.get(s)))
    def update(self,s,a,r,s2):
        q, q2 = self.get(s), self.get(s2)
        q[a] += self.α*((r + self.γ*max(q2)) - q[a])
    def decay(self): self.ε = max(self.ε_min, self.ε*self.ε_decay)

def main():
    n = int(sys.argv[1]) if len(sys.argv)>1 else 10
    episodes = int(sys.argv[2]) if len(sys.argv)>2 else 500
    maze = generate_maze(n)
    env   = MazeEnv(maze)
    agent = QLearner()

    all_episodes = []
    for ep in range(num_episodes):
        state = env.reset()
        path = [state]
        done = False
        while not done:
            action = choose_action(state)
            next_state, reward, done, _ = env.step(action)
            path.append(next_state)
            state = next_state
        all_episodes.append(path)

    out = {
      "size": len(maze), 
      "maze": maze,
      "episodes": all_eps
    }
    print(json.dumps({ "episodes": all_episodes }))

if __name__=="__main__":
    main()
