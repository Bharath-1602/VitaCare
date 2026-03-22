FROM node:18-alpine

WORKDIR /app

COPY vital-signs-service/package*.json ./
RUN npm install --production

COPY vital-signs-service/ .
COPY shared/ /app/shared/

EXPOSE 3003

CMD ["node", "server.js"]
