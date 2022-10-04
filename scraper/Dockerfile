FROM python:3.10.5-alpine

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV DATABASE_URL=mongodb://mongo:27017
ENV SOCKET_TOKEN=af7c1fe6-d669-414e-b066-e9733f0de7a8

CMD ["python", "-u", "src/index.py"]