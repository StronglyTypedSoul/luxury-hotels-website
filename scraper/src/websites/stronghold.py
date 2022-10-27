from bs4 import BeautifulSoup
from datetime import datetime


name = "Stronghold"
url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"
html_file = "./src/websites/htmls/stronghold.html"

# Scrapes all the pastes' titles from the page
def get_titles(soup: BeautifulSoup):
    titlesElements = soup.select("h4")
    titles = [title.getText().strip() for title in titlesElements]
    return titles


# Scrapes all the pastes' contents from the page
def get_contents(soup: BeautifulSoup):
    contents_elements = soup.select(".text ol")
    contents = []
    for i in range(len(contents_elements)):
        content_row_elements = contents_elements[i].select("li div")
        content_rows = [row.getText().strip() for row in content_row_elements]
        content = "\n".join(content_rows).strip()
        contents.append(content)
    return contents


# Scrapes all the paste' information (author and date) from the page
def get_infos(soup: BeautifulSoup):
    infos_elements = soup.select(".col-sm-6:nth-child(odd)")
    infos = [info.getText().strip() for info in infos_elements]
    return infos


# Extracts the author from a paste information
def get_authors(infos: list[str]):
    authors = [info.split("by")[1].split("at")[0].strip() for info in infos]
    return authors


# Extracts the date from a paste information
def get_dates(infos: list[str]):
    dates = [info.split("at")[1].strip()[:-4] for info in infos]
    dates = [datetime.strptime(date, "%d %b %Y, %H:%M:%S") for date in dates]
    return dates


# Builds all the pastes with title, content, author and date
def extract_pastes(soup: BeautifulSoup):
    titles = get_titles(soup)
    contents = get_contents(soup)
    infos = get_infos(soup)
    authors = get_authors(infos)
    dates = get_dates(infos)
    pastes = []
    for i in range(len(titles)):
        paste = {"title": titles[i], "content": contents[i], "author": authors[i], "date": dates[i], "tags": []}
        pastes.append(paste)
    print(f"{len(pastes)} pastes were scraped from 'stronghold'")
    return pastes
