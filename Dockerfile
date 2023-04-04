FROM node:19

WORKDIR /cosmess/
COPY ./package*.json ./

RUN npm install

COPY ./.git ./
COPY ./src/app.js ./app.js
COPY ./dist/* dist/

EXPOSE 3000

CMD [ "node", "app.js" ]
