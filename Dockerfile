FROM node

MAINTAINER Emil Bergström emil.bergstrom@cygni.se

COPY . /var/cabinbooker

WORKDIR /var/cabinbooker
	
RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
