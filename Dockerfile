FROM node:alpine3.18

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]