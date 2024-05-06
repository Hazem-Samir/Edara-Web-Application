FROM node:slim

WORKDIR /app
COPY package*.json .
RUN npm install -g nodemon
RUN npm install .
COPY . .

EXPOSE 4000

CMD [ "npm" ,"start"]