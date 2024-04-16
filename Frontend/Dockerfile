FROM node:alpine3.18

WORKDIR /app

COPY . .
RUN npm install -g npm@10.5.2
RUN npm install .
EXPOSE 3000
CMD ["npm", "start"]
# CMD ["sh" , "/bin/bash"]