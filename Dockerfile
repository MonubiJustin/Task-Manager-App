FROM node:20.11.1-alpine3.19
RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . .
RUN chown -R app:app /app  # Grant ownership of /app to the app user
USER app
EXPOSE 3000
CMD ["npx", "nodemon", "app.js"]
