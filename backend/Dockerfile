# Stage 1 - Installing app dependencies
FROM node:16.17.0-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=mongodb://mongo:27017/darknet
ENV RABBITMQ_HOST=rabbitmq
ENV RABBITMQ_PASTES_QUEUE=pastes

# Stage 2 - Building the app
FROM node:16.17.0-alpine as build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app ./

RUN npm run build

# Stage 3 - Serving the app
FROM node:16.17.0-alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

RUN npm install --omit=dev

COPY --from=build /usr/src/app/build ./build

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=mongodb://mongo:27017/darknet
ENV RABBITMQ_HOST=rabbitmq
ENV RABBITMQ_PASTES_QUEUE=pastes

CMD ["npm","start"]