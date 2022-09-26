from time import sleep
from dotenv import load_dotenv

load_dotenv()

from scraper import scrape_pastes
from analyzer import tag_pastes
from db import find_paste_by_content, insert_paste


# Insert pastes to the database, if they exist their count is incremented
def insert_to_db(pastes):
    for paste in pastes:
        search_result = find_paste_by_content(paste["content"])
        if search_result:
            print(f"duplicate of paste {search_result['_id']} titled {paste['title']}")
        else:
            insert_paste(paste["title"], paste["content"], paste["author"], paste["date"], paste["tags"])
            print(f"inserted a new paste titled {paste['title']}")


def main():
    while True:
        try:
            print("Starting scraping process")
            pastes = scrape_pastes()
            tag_pastes(pastes)
            insert_to_db(pastes)
            print("Scraping process succeeded")
        except:
            print("Scraping process failed")
        sleep(120)


if __name__ == "__main__":
    main()
