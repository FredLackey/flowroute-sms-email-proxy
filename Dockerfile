FROM node:18-alpine

LABEL maintainer="Fred Lackey fred.lackey@gmail.com"
LABEL description="Flowroute Proxy Server"
LABEL version="1.0.4"

RUN mkdir -p /var/www

WORKDIR /var/www

COPY . /var/www

RUN npm install

EXPOSE 3000

CMD ["node", "./server.js"]