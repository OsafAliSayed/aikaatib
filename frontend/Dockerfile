FROM node:20.11.0

WORKDIR /app

# Install the dependencies
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]