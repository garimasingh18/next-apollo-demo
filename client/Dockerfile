#FROM node:16
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install

COPY . ./

RUN npm build

EXPOSE 3000

CMD ["yarn", "run", "dev"]
