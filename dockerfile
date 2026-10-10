FROM node:16.15-alpine

WORKDIR /lambda

RUN npm install npm@8.16.0
RUN npm install -g serverless
RUN apk add py3-pip
RUN pip install --upgrade awscli
RUN pip install awscli-local
RUN apk add groff
RUN apk add update
RUN apk add upgrade
