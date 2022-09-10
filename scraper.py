import requests
from bs4 import BeautifulSoup
from datetime import datetime

session = requests.session()
session.proxies["http"] = "socks5h://localhost:9050"
session.proxies["https"] = "socks5h://localhost:9050"

url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"
response = session.get(url)

soup = BeautifulSoup(response.content, "html.parser")

# Scrapes all the posts' titles from the page
def get_titles():
    titlesElements = soup.select("h4")
    titles = [title.getText().strip() for title in titlesElements]
    return titles


# Scrapes all the posts' contents from the page
def get_contents():
    contents_elements = soup.select(".text ol")
    contents = []
    for i in range(len(contents_elements)):
        content_row_elements = contents_elements[i].select("li div")
        content_rows = [row.getText().strip() for row in content_row_elements]
        content = "\n".join(content_rows).strip()
        contents.append(content)
    return contents


# Scrapes all the posts' information (author and date) from the page
def get_infos():
    infos_elements = soup.select(".col-sm-6:nth-child(odd)")
    infos = [info.getText().strip() for info in infos_elements]
    return infos


# Extracts the author from a post information
def get_authors(infos):
    authors = [info.split("by")[1].split("at")[0].strip() for info in infos]
    return authors


# Extracts the date from a post information
def get_dates(infos):
    dates = [info.split("at")[1].strip()[:-4] for info in infos]
    dates = [datetime.strptime(date, "%d %b %Y, %H:%M:%S") for date in dates]
    return dates


titles = get_titles()
contents = get_contents()
infos = get_infos()
authors = get_authors(infos)
dates = get_dates(infos)

# Builds all the posts with title, content, author and date
posts = []
for i in range(len(titles)):
    post = {"title": titles[i], "content": contents[i], "author": authors[i], "date": dates[i]}
    posts.append(post)
    print(post)
