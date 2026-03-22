FROM node:18-alpine

WORKDIR /app

COPY appointment-service/package*.json ./
RUN npm install --production

COPY appointment-service/ .
COPY shared/ /app/shared/

EXPOSE 3001

CMD ["node", "server.js"]
