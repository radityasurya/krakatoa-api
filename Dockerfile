FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install -g nodemon

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]