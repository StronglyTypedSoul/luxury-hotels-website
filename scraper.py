from bs4 import BeautifulSoup
import codecs
from controller import inc_post_count, insert_post, find_post_by_content
import stronghold
from torRequest import get_tor_content


INTEGRATED_HTML = True

current_website = stronghold
html = ""

if INTEGRATED_HTML:
    file = codecs.open(current_website.html_file, "r", "utf-8")
    html = file.read()
else:
    url = current_website.url
    html = get_tor_content(url)

soup = BeautifulSoup(html, "html.parser")
posts = current_website.get_posts(soup)

for post in posts:
    search_result = find_post_by_content(post["content"])
    if search_result:
        id = search_result["_id"]
        if post["date"] != search_result["date"]:
            inc_post_count(id)
            print(f"incremented count of post {id}")
        else:
            print(f"duplicate of post {id}")
    else:
        insert_post(post["title"], post["content"], post["author"], post["date"])
        print(f"inserted a new post titled {post['title']}")
