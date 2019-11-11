FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY build /build
COPY package.json /package.json
RUN npm i

EXPOSE 5000

CMD [ "pm2-runtime", "/build/server/server.js" ]