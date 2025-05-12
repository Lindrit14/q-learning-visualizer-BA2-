#!/usr/bin/env python3
import json

def main():
    # some dummy data
    data = {
        "message": "Hello from Python!",
        "numbers": [10, 20, 30]
    }
    # print JSON to stdout
    print(json.dumps(data))

if __name__ == '__main__':
    main()
