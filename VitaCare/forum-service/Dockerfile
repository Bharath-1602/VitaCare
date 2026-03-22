FROM node:18-alpine

WORKDIR /app

COPY forum-service/package*.json ./
RUN npm install --production

COPY forum-service/ .
COPY shared/ /app/shared/

EXPOSE 3007

CMD ["node", "server.js"]
