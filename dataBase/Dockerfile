FROM postgres

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE ${PORT}

VOLUME [ "/app/src/data" ]

CMD [ "npm", "run", "start" ]