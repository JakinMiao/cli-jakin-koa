.PHONY: build

NAME=
REGISTRY=
PROD_REGISTRY=
NAMESPACE=xed
TAG=beta

build-test:
	echo building ${NAME}:${TAG}
	docker build -t ${REGISTRY}/${NAMESPACE}/${NAME}:${TAG} .
	docker push "${REGISTRY}/${NAMESPACE}/${NAME}:${TAG}"

build:
	echo building ${NAME}:${TAG}
	docker build -t ${PROD_REGISTRY}/${NAMESPACE}/${NAME}:${TAG} .
	docker push "${PROD_REGISTRY}/${NAMESPACE}/${NAME}:${TAG}"
