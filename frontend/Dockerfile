# Stage 1 - Installing app dependencies
FROM node:16.17.0-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV WATCHPACK_POLLING=true

COPY . .

# Stage 2 - Building the app
FROM node:16.17.0-alpine as build

WORKDIR /usr/src/app

ENV GENERATE_SOURCEMAP=false

COPY --from=development /usr/src/app ./

RUN npm run build

# Stage 3 - Serving the app
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]