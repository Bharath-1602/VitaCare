FROM nginx:alpine

# Copy static frontend files to Nginx web root
COPY ./public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
