import requests


# Gets a response from a website in Tor by proxying
def get_tor_content(url: str):
    session = requests.session()
    session.proxies["http"] = "socks5h://localhost:9050"
    session.proxies["https"] = "socks5h://localhost:9050"
    response = session.get(url)
    return response.content
