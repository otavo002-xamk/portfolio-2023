FROM node:20.8 AS build

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]