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
def get_content(url: str):
    html = get_tor_content(url)
    content_soup = BeautifulSoup(html, "html.parser")
    content = content_soup.getText().strip()
    print(content)
    # print("\n".join(list(filter(None, "".join(text.split("\r")).split("\n")))))
    return content


# Builds a post from a row in the page's table
def get_post_from_row(row: Tag):
    cells = [cell for cell in row.select("td")]
    title = cells[0].getText().strip()
    author = cells[1].getText().strip()
    time_ago = cells[3].getText().strip().split(" ")
    d = datetime.today() - timedelta(hours=0, minutes=int(time_ago[0]))
    link = cells[0].select("a")[0].attrs["href"]
    paste_id = link.split("/")[-1]
    content_url = single_paste_content_url + paste_id
    content = get_content(content_url)
    post = {"title": title, "content": content, "author": author, "date": date}


# Builds all the posts with title, content, author and date
def get_posts(soup: BeautifulSoup):
    rows = get_rows(soup)
    posts = []
    # for row in rows:
    posts.append(get_post_from_row(rows[0]))
    print(f"{len(posts)} posts were scraped from 'dark web paste'")
    return posts
