FROM node:20.8

WORKDIR /usr/src/app

COPY package* ./

RUN npm install