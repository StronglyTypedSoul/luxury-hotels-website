from bs4 import BeautifulSoup
import codecs
from db import insert_paste, find_paste_by_content
import stronghold
import darkWebPaste
from torRequest import get_tor_content
from analyzer import tag_pastes


INTEGRATED_HTML = False
current_website = darkWebPaste


# Scrapes the pastes out of the pastes page
def scrape_pastes():
    html = ""
    if INTEGRATED_HTML:
        file = codecs.open(current_website.html_file, "r", "utf-8")
        html = file.read()
    else:
        url = current_website.url
        html = get_tor_content(url)
    soup = BeautifulSoup(html, "html.parser")
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
