FROM node:18-alpine

WORKDIR /app

COPY admin-service/package*.json ./
RUN npm install --production

COPY admin-service/ .
COPY shared/ /app/shared/

EXPOSE 3009

CMD ["node", "server.js"]
