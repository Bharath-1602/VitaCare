FROM node:18-alpine

WORKDIR /app

COPY user-management-service/package*.json ./
RUN npm install --production

COPY user-management-service/ .
COPY shared/ /app/shared/

EXPOSE 3002

CMD ["node", "server.js"]
