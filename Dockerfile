FROM node:14

COPY ./ /app

RUN cd /app \
    && npm ci

WORKDIR /app

CMD ["npm", "start"]
