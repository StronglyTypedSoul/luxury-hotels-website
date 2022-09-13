from bs4 import BeautifulSoup, Tag
from datetime import datetime, timedelta
from torRequest import get_tor_content

url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists"
single_paste_content_url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/view/raw/"
html_file = "./htmls/darkWebPaste.html"

# Extracts all the rows from the page's pastes table
def get_rows(soup: BeautifulSoup):
    rows = soup.select("tbody tr")
    rows.pop(0)  # Removes the first row that contains headers
    return rows


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
    if time_unit[-1]:
        time_unit += "s"
    delta[time_unit] = int(time_quantity)
    date = datetime.today() - timedelta(minutes=delta["minutes"], hours=delta["hours"], days=delta["days"], weeks=delta["weeks"])
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


# Builds all the pastes with title, content, author and date
def extract_pastes(soup: BeautifulSoup):
    rows = get_rows(soup)
    pastes = []
    for row in rows:
        pastes.append(get_paste_from_row(row))
    print(f"{len(pastes)} pastes were scraped from 'dark web paste'")
    return pastes
