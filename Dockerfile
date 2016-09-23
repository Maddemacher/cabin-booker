FROM node

MAINTAINER Emil Bergstr�m emil.bergstrom@cygni.se

COPY . /var/cabinbooker

WORKDIR /var/cabinbooker

RUN npm install -g bower
RUN npm install
RUN bower install --allow-root

EXPOSE 3000

ENV CB_MONGO_HOSTNAME cbmongo

ENTRYPOINT ["npm", "start"]
