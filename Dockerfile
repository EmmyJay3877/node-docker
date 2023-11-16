FROM node:21-alpine3.17
RUN apk --no-cache add --virtual builds-deps build-base python
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
COPY . ./
ENV PORT 3000
CMD ["node", "main.js"]