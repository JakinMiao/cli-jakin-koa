FROM node:10.16.3-alpine as base

RUN echo http://mirrors.aliyun.com/alpine/v3.4/main/ > /etc/apk/repositories && \
              echo http://mirrors.aliyun.com/alpine/v3.4/community/ >> /etc/apk/repositories
WORKDIR /data
COPY package.json .
RUN npm install --build-from-source --registry=https://registry.npm.taobao.org \
                --disturl=https://npm.taobao.org/mirrors/node \
                --production && \
    npm cache verify && rm package.json

FROM node:10.16.3-alpine as build

WORKDIR /data

ENV TZ "Asia/Kolkata"

COPY --from=base /data/node_modules ./node_modules

RUN npm install pm2 -g --registry=https://registry.npm.taobao.org

RUN echo http://mirrors.aliyun.com/alpine/v3.4/main/ > /etc/apk/repositories && \
    echo http://mirrors.aliyun.com/alpine/v3.4/community/ >> /etc/apk/repositories && \
    apk update && apk add ca-certificates && \
    apk add tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    echo "Asia/Kolkata" > /etc/timezone

COPY . .
RUN ./node_modules/.bin/tsc

EXPOSE 9001

# Start process.yml
CMD ["pm2-runtime","./bin/processes_docker.yml"]
