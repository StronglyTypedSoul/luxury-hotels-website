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


titles = get_titles()
contents = get_contents()
print(titles)
print(contents)
