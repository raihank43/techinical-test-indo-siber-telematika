FROM node

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

## Install nodemon
RUN npm install -g nodemon

COPY ./ ./

EXPOSE 3000

CMD npx prisma migrate deploy && npm run start:dev