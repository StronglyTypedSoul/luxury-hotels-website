from bs4 import BeautifulSoup
import codecs
import websites.stronghold as stronghold
import websites.darkWebPaste as darkWebPaste
from torRequest import get_tor_content


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
