FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json .
COPY swagger.yaml .
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist
CMD ["npm", "start"]
