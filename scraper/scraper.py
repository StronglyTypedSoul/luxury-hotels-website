from bs4 import BeautifulSoup
import codecs
from db import insert_paste, find_paste_by_content
import stronghold
import darkWebPaste
from torRequest import get_tor_content
from analyzer import tag_pastes


ONLINE = True
current_website = darkWebPaste


# Scrapes the pastes out of the pastes page
def scrape_pastes():
    html = ""
    print("Fetching from website")
    if ONLINE:
        url = current_website.url
        html = get_tor_content(url)
    else:
        file = codecs.open(current_website.html_file, "r", "utf-8")
        html = file.read()
    print("Received response from website")
    soup = BeautifulSoup(html, "html.parser")
    print("Extracting pastes from html")
    pastes = current_website.extract_pastes(soup)
    return pastes


# Insert pastes to the database, if they exist their count is incremented
def insert_to_db(pastes):
    for paste in pastes:
        search_result = find_paste_by_content(paste["content"])
        if search_result:
            print(f"duplicate of paste {search_result['_id']} titled {paste['title']}")
        else:
            insert_paste(paste["title"], paste["content"], paste["author"], paste["date"], paste["tags"])
            print(f"inserted a new paste titled {paste['title']}")


pastes = scrape_pastes()
tag_pastes(pastes)
insert_to_db(pastes)
