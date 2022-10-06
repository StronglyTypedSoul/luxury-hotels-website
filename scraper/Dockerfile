FROM python:3.10.5-alpine

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV DATABASE_URL=mongodb://mongo:27017
ENV RABBITMQ_HOST=rabbitmq
ENV RABBITMQ_PASTES_QUEUE=pastes

CMD ["python", "-u", "src/index.py"]