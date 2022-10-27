from bs4 import BeautifulSoup
import codecs
import websites.stronghold as stronghold
import websites.darkWebPaste as darkWebPaste
from torRequest import get_tor_content


ONLINE = True
websites = [darkWebPaste, stronghold]

# Scrapes the pastes out of the pastes page
def scrape_pastes():
    html = ""
    pastes = []
    for website in websites:
        print(f"Fetching from website - {website.name}")
        if ONLINE:
            url = website.url
            html = get_tor_content(url)
        else:
            file = codecs.open(website.html_file, "r", "utf-8")
            html = file.read()
        print(f"Received response from website - {website.name}")
        soup = BeautifulSoup(html, "html.parser")
        print(f"Extracting pastes from html - {website.name}")
        pastes += website.extract_pastes(soup)
    return pastes
