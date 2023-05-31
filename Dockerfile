FROM node as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .

COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]