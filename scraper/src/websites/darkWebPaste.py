from bs4 import BeautifulSoup, Tag
from datetime import datetime, timezone, timedelta
from torRequest import get_tor_content
import time


name = "DarkWebPaste"
url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists"
single_paste_content_url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/view/raw/"
html_file = "./src/websites/htmls/darkWebPaste.html"


# Extracts the content from the specific paste's page
def get_content(paste_id: str):
    content_url = single_paste_content_url + paste_id
    html = get_tor_content(content_url)
    content_soup = BeautifulSoup(html, "html.parser")
    content = content_soup.getText().strip()
    return content


# Calculates a paste's date by the amount of time that passed since it was posted
def calculate_paste_date(time_quantity: int, time_unit: str):
    delta = {"minutes": 0, "hours": 0, "days": 0, "weeks": 0}
    if time_unit[-1] != "s":
        time_unit += "s"
    delta[time_unit] = int(time_quantity)
    now = datetime.now(tz=timezone.utc)
    date = now - timedelta(minutes=delta["minutes"], hours=delta["hours"], days=delta["days"], weeks=delta["weeks"])
    return date


# Builds a paste from a row in the page's table
def get_paste_from_row(row: Tag):
    cells = [cell for cell in row.select("td")]
    title = cells[0].getText().strip()
    author = cells[1].getText().strip()
    time_ago = cells[3].getText().strip().split(" ")
    date = calculate_paste_date(int(time_ago[0]), time_ago[1].lower())
    paste_id = cells[0].select("a")[0].attrs["href"].split("/")[-1]
    content = get_content(paste_id)
    paste = {"title": title, "content": content, "author": author, "date": date, "tags": []}
    return paste


# Builds a paste from a row in the page's table
def build_paste(titleHtml: Tag, authorHtml: Tag, dateHtml: Tag):
    title = titleHtml.getText().strip()
    author = authorHtml.getText().strip()
    time_ago = dateHtml.getText().strip().split(" ")
    date = calculate_paste_date(int(time_ago[0]), time_ago[1].lower())
    paste_id = titleHtml.select("a")[0].attrs["href"].split("/")[-1]
    content = get_content(paste_id)
    paste = {"title": title, "content": content, "author": author, "date": date, "tags": []}
    return paste


# Builds all the pastes with title, content, author and date
def extract_pastes(soup: BeautifulSoup):
    pastes = []
    start_time = time.time()
    cells = soup.select("td")
    tenth = int(len(cells) / 4 / 10)
    for i in range(0, len(cells), 4):
        if i > 0 and i % (tenth * 4) == 0:
            end_time = time.time()
            print(f"{int(i/4)} / {int(len(cells)/4)} pastes done - {round(end_time - start_time, 2)} seconds elapsed")
        paste = build_paste(cells[i], cells[i + 1], cells[i + 3])
        pastes.append(paste)
    print(f"{len(pastes)} pastes were scraped from 'dark web paste'")
    return pastes
