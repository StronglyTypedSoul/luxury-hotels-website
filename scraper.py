import requests
from bs4 import BeautifulSoup
from datetime import datetime

session = requests.session()
session.proxies["http"] = "socks5h://localhost:9050"
session.proxies["https"] = "socks5h://localhost:9050"

url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"
response = session.get(url)

soup = BeautifulSoup(response.content, "html.parser")

print(soup.getText())
