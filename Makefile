.PHONY: build

NAME=cli-jakin-koa
REGISTRY=
NAMESPACE=test
TAG=beta

build:
	echo building ${NAME}:${TAG}
	docker build -t ${REGISTRY}/${NAMESPACE}/${NAME}:${TAG} .
	docker push "${REGISTRY}/${NAMESPACE}/${NAME}:${TAG}"
