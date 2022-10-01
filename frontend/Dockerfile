# Stage 1 - Building the react app
FROM node:16.17.0-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

ENV WATCHPACK_POLLING=true

COPY . .


# Stage 2 - Middleware between development and production
FROM node:16.17.0-alpine as build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

RUN npm run build

# Stage 3 - Serving the react app
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]