FROM node:16.0.0

#create app directory
WORKDIR /app
RUN npm cache clean --force
#Install app dependencies
COPY package.json .

#Install npm
RUN npm install

#Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]

