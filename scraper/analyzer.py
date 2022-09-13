from ctypes.wintypes import tagMSG
import json

with open("tags.json") as f:
    tags = json.load(f)


def tag_posts(posts: list[dict]):
    for post in posts:
        for tag in tags:
            for keyword in tags[tag]:
                if keyword in post["title"].lower() or keyword in post["content"].lower():
                    post["tags"].append(tag)
                    break
