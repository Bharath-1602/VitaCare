FROM node:18-alpine

WORKDIR /app

COPY complaint-service/package*.json ./
RUN npm install --production

COPY complaint-service/ .
COPY shared/ /app/shared/

EXPOSE 3008

CMD ["node", "server.js"]
