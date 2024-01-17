FROM node:16.14-alpine3.14 as angular

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs/

COPY --from=angular /app/dist/sato-quiz/ .
