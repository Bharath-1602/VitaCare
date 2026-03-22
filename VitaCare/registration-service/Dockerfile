FROM node:18-alpine

WORKDIR /app

COPY registration-service/package*.json ./
RUN npm install --production

COPY registration-service/ .
COPY shared/ /app/shared/

EXPOSE 3004

CMD ["node", "server.js"]
