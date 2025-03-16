FROM node:20.8

WORKDIR /usr/src/app

COPY package* ./

RUN npm install && useradd -m appuser && chown appuser .

USER appuser