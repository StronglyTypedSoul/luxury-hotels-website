import json

# Loads all the tags from the tags.json file
with open("./src/tags.json") as f:
    tags = json.load(f)


# Checks every paste's title and content and tags them appropriately
def tag_pastes(pastes: list[dict]):
    for paste in pastes:
        for tag in tags:
            for keyword in tags[tag]:
                if keyword in paste["title"].lower() or keyword in paste["content"].lower():
                    paste["tags"].append(tag)
                    break
