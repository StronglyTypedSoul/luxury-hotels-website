FROM node:16.17.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=mongodb://mongo:27017/darknet

EXPOSE 5000

CMD ["npm", "start"]