from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

client = MongoClient()
client = MongoClient("mongodb://127.0.0.1:27017")

db = client.darknet
posts = db.posts


# Inserts a post to the posts collection
def insert_post(title: str, content: str, author: str, date: datetime):
    post = {"title": title, "content": content, "author": author, "date": date, "count": 1}
    posts.insert_one(post)


# Finds a posts document by content
def find_post_by_content(content: str):
    query = {"content": content}
    result = posts.find_one(query)
    return result


# Increments the count of a post by 1
def inc_post_count(id: ObjectId):
    query = {"_id": id}
    update = {"$inc": {"count": 1}}
    posts.update_one(query, update)
