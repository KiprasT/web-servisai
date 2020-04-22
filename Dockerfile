FROM node

WORKDIR /usr/src/app

COPY package.json .

COPY . .

EXPOSE 5000
cmd "npm" "install" "express"
CMD "node" "app.js"