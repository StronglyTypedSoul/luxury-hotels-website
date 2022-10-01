FROM node:16.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=mongodb://mongo:27017/darknet

EXPOSE 5000

CMD ["npm", "run", "dev"]