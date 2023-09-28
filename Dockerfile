FROM node:18.17.1-bullseye

COPY . /home/node-apps/product-storage

WORKDIR /home/node-apps/product-storage

RUN apt-get update -y

RUN npm install