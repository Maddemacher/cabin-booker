FROM node

MAINTAINER Emil Bergström emil.bergstrom@cygni.se

COPY . /var/cabinbooker

WORKDIR /var/cabinbooker

RUN npm install -g bower
RUN npm install
RUN bower install

EXPOSE 3000

ENV CB_MONGO_HOSTNAME cbmongo

ENTRYPOINT ["npm", "start"]
