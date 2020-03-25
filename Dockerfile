### STAGE 1: build ###
FROM node:alpine3.10 as builder

WORKDIR /ng-app
COPY package.json package-lock.json ./
RUN npm install
COPY src ./src
COPY angular.json tsconfig.json tsconfig.app.json tslint.json ./
RUN $(npm bin)/ng build

### STAGE 2: Setup ###
FROM nginx:1.17.9-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist/new-codehub-frontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
