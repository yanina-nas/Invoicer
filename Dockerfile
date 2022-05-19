FROM node:14-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 8080

CMD yarn dev
