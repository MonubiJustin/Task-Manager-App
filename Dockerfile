FROM node:20.11.1-alpine3.19

# install bash to use 'wait-for-it'
RUN apk update && apk add bash && apk add --no-cache coreutils

# Add 'wait-for-it'
COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . .
RUN chown -R app:app /app  # Grant ownership of /app to the app user
USER app
EXPOSE 4000
CMD ["npx", "nodemon", "app.js"]
