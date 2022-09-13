from bs4 import BeautifulSoup
import codecs
from controller import inc_post_count, insert_post, find_post_by_content
import stronghold
import darkWebPaste
from torRequest import get_tor_content
from analyzer import tag_posts


INTEGRATED_HTML = False
current_website = darkWebPaste


def scrape_posts():
    html = ""
    if INTEGRATED_HTML:
        file = codecs.open(current_website.html_file, "r", "utf-8")
        html = file.read()
    else:
        url = current_website.url
        html = get_tor_content(url)
    soup = BeautifulSoup(html, "html.parser")
    posts = current_website.extract_posts(soup)
    return posts


def insert_to_db(posts):
    for post in posts:
        search_result = find_post_by_content(post["content"])
        if search_result:
            id = search_result["_id"]
            compare_field = "site_id" if "site_id" in post else "date"
            if post[compare_field] != search_result[compare_field]:
                inc_post_count(id)
                print(f"incremented count of post {id} titled {post['title']}")
            else:
                print(f"duplicate of post {id} titled {post['title']}")
        else:
            if "site_id" not in post:
                post["site_id"] = ""
            insert_post(post["title"], post["content"], post["author"], post["date"], post["tags"], post["site_id"])
            print(f"inserted a new post titled {post['title']}")


posts = scrape_posts()
tag_posts(posts)
insert_to_db(posts)
