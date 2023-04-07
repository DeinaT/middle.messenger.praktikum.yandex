FROM node:19

WORKDIR /cosmess/
COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN ls

RUN npm run build

CMD [ "node", "./src/app.js" ]
