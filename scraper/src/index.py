from dotenv import load_dotenv

load_dotenv()

import time
from scraper import scrape_pastes
from analyzer import tag_pastes
from db import find_paste_by_content, insert_paste
from torRequest import get_tor_content
from websites.darkWebPaste import url


# Insert pastes to the database if they do not already exist
def insert_to_db(pastes):
    for paste in pastes:
        search_result = find_paste_by_content(paste["content"])
        if search_result:
            print(f"duplicate of paste {search_result['_id']} titled {paste['title']}")
        else:
            insert_paste(paste["title"], paste["content"], paste["author"], paste["date"], paste["tags"])
            print(f"inserted a new paste titled {paste['title']}")


# Validating the connection to tor browser
def validate_connection():
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


# The main application loop, attempting to scrape the website every 2 minutes
def main():
    validate_connection()
    while True:
        try:
            print("Starting scraping process")
            pastes = scrape_pastes()
            tag_pastes(pastes)
            insert_to_db(pastes)
            print("Scraping process succeeded")
        except Exception as e:
            print(e)
            print("Scraping process failed")
        time.sleep(120)


if __name__ == "__main__":
    main()
