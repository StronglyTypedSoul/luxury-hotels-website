from dotenv import load_dotenv

load_dotenv()

import os
import time
from scraper import scrape_pastes
from analyzer import tag_pastes
from db import find_paste_by_content, insert_paste
from torRequest import get_tor_content
from websites.darkWebPaste import url
from rabbitmq import publish_pastes


# Insert pastes to the database if they do not already exist
def insert_to_db(pastes):
    new_pastes = []
    for paste in pastes:
        search_result = find_paste_by_content(paste["content"])
        if not search_result:
            insert_paste(paste["title"], paste["content"], paste["author"], paste["date"], paste["tags"])
            new_pastes.append(paste)
            print(f"inserted a new paste titled {paste['title']}")
    return new_pastes


# Establishing the connection to tor browser
def establish_tor_connection():
    print("Establishing connection with TOR")
    connection = False
    while not connection:
        try:
            get_tor_content(url)
            connection = True
        except:
            print("Failed to connect, trying again...")
            pass
        time.sleep(5)
    print("Connection established")
    return


# The main application loop, attempting to scrape the website every 5 minutes
def main():
    establish_tor_connection()
    while True:
        try:
            print("Starting scraping process")
            pastes = scrape_pastes()
            tag_pastes(pastes)
            new_pastes = insert_to_db(pastes)
            print("Scraping process succeeded, sleeping...")
            compact_new_pastes = list(map(lambda paste: {"title": paste["title"], "author": paste["author"], "tags": paste["tags"]}, new_pastes))
            publish_pastes({"error": False, "pastes": compact_new_pastes})
        except Exception as e:
            print(e)
            print("Scraping process failed, trying again...")
            publish_pastes({"error": True, "pastes": []})
            time.sleep(5)
        else:
            time.sleep(300)


if __name__ == "__main__":
    main()
