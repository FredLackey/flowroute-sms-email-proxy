FROM node:6-alpine

MAINTAINER Fred Lackey <fred.lackey@gmail.com>

RUN mkdir -p /var/www

WORKDIR /var/www

COPY . /var/www

RUN npm install

EXPOSE 3000

CMD ["node", "./server.js"]