FROM node:18-alpine
WORKDIR /app/challenge

COPY package.json .

RUN npm install
RUN npm install typescript -g

COPY . .

RUN npm run build

CMD ["node", "./dist/index.js"]

EXPOSE 3333
