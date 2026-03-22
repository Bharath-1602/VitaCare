FROM node:18-alpine

WORKDIR /app

COPY doctor-service/package*.json ./
RUN npm install --production

COPY doctor-service/ .
COPY shared/ /app/shared/

EXPOSE 3005

CMD ["node", "server.js"]
