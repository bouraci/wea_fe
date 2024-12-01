all: clone-be run

build-push: clone-be build push

in:
	docker exec -it wea_fe bash

push:
	@echo "Pushing WEA_BE image to the registry..."
	docker push hejsekvojtech/wea_be:latest
	@echo "Pushing WEA_FE image to the registry..."
	docker push hejsekvojtech/wea_fe:latest

clone-be:
	@if [ ! -d "modules/wea_be" ]; then \
		echo "Cloning backend repository..."; \
		git clone git@github.com:bouraci/wea_be.git modules/wea_be; \
	else \
		echo "WEA BE repository already exists. Pulling latest changes..."; \
		cd modules/wea_be && git pull origin master; \
	fi

FRONTEND_COMMIT_HASH := $(shell git rev-parse --short HEAD)
BACKEND_COMMIT_HASH := $(shell cd modules/wea_be && git rev-parse --short HEAD)

generate-env:
	echo "NEXT_PUBLIC_FRONTEND_COMMIT_HASH=$(FRONTEND_COMMIT_HASH)" > .env.local
	echo "NEXT_PUBLIC_BACKEND_COMMIT_HASH=$(BACKEND_COMMIT_HASH)" >> .env.local

build: generate-env
	@echo "Building WEA_BE image with commit hash $(BACKEND_COMMIT_HASH)..."
	docker build --build-arg BACKEND_COMMIT_HASH=$(BACKEND_COMMIT_HASH) -t hejsekvojtech/wea_be:latest modules/wea_be
	@echo "Building WEA_FE image with commit hash $(FRONTEND_COMMIT_HASH)..."
	docker build --build-arg FRONTEND_COMMIT_HASH=$(FRONTEND_COMMIT_HASH) -t hejsekvojtech/wea_fe:latest .


run:
	@echo "Running Docker Compose..."
	make clone-be
	make generate-env
	docker compose up -d --build


init:
	@echo "Creating network..."
	docker network inspect cdb-network >/dev/null 2>&1 || docker network create --driver bridge cdb-network
