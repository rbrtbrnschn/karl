FROM node:17-alpine3.12

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g nx nodemon serve

CMD ["npx", "nx","build", "server"]
CMD ["npx", ,"nx", "build", "client"]

