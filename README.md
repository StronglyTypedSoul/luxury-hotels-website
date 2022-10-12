# Intsights Darkweb Scraper

This project was collaborated with Rapid7, as part of the Cyber4s program by Scale-Up Velocity.

The goal of the project is to scrape data from a pastes site (like Pastebin) in the dark web.  
The data should be analyzed and saved in a database, and then be presented in a dashboard.

The code is split to a front end application and 2 main services:

- **Frontend**: built with **React** and **Typescript**.
- **Backend**: built with **Nodejs**, **Express**, **Typescript** and **MongoDB**.
- **Scraper**: built with **Python** and **MongoDB**.

The paste site is scraped from Tor browser.  
The API server and the python scraper act as microservices and communicate via RabbitMQ.  
The entire application is dockerized using docker-compose.

## Live Application

Deployed on an AWS EC2 instance.  
http://darkweb-scraper.tk
