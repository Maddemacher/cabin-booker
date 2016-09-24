#PRERES MongoDb docker container

#BUILD docker build -t cabinbookernode .
#RUN docker run -p 1337:3000 --name cabinbookernode -d --link cbmongo:mongodb cabinbookernode


FROM node

MAINTAINER Emil Bergström emil.bergstrom@cygni.se

COPY . /var/cabinbooker

WORKDIR /var/cabinbooker

RUN npm install -g bower
RUN npm install
RUN bower install --allow-root

EXPOSE 3000

ENV CB_MONGO_HOSTNAME cbmongo

ENTRYPOINT ["npm", "start"]
