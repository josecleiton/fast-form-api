FROM node:14 AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
# RUN npx nest-i18n check src/i18n
RUN npm run build

FROM node:14-alpine
WORKDIR /ff-volume/app
RUN npm i -g typescript ts-node
COPY --from=builder /app ./
EXPOSE ${PORT}
CMD ["npm","run", "start:prod"]
