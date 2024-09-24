FROM docker.io/nginx:1.25.4-alpine

LABEL maintainer="Software Engineering - DevOps Team <ccoe@activadigital.it>"

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    curl

COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf 

COPY ./nginx.conf /etc/nginx/nginx.conf 

COPY /dist/console-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]