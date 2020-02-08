##!/usr/bin/env bash
CONTAINER_NAME=cli-jakin-koa
IMAGE_NAME=xxx

echo "正在重新部署 ${CONTAINER_NAME}"

# #停止正在运行的容器
docker stop ${CONTAINER_NAME}

# #删除旧容器
docker rm ${CONTAINER_NAME}

# #删除image，确保下载的是最新镜像
docker rmi ${IMAGE_NAME}

#下载最新镜像并启动
docker run -d -p 3900:3900 --name ${CONTAINER_NAME} ${IMAGE_NAME}

echo "容器 ${CONTAINER_NAME} 重新部署成功"
