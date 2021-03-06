#PRERES MongoDb docker container

#BUILD

#docker build -t cabinbookernode --file ./dockerfile.development .

#RUN

#docker run --name cbmongo mongo -d
#docker run -p 1337:3000 --name cabinbookernode -d --link cbmongo:mongodb cabinbookernode

#STOP

#docker stop cabinbookernode
#docker rm cabinbookernode

FROM node

MAINTAINER Emil Bergström emil.bergstrom@cygni.se

WORKDIR /var/cabinbooker

RUN npm install -g pm2
RUN npm install -g bower
RUN npm install
RUN bower install --allow-root

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
