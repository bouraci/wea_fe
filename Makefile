all: clone-be run

build-push: clone-be build push

push:
	@echo "Pushing WEA_BE image to the registry..."
	docker push hejsekvojtech/wea_be:latest
	@echo "Pushing WEA_FE image to the registry..."
	docker push hejsekvojtech/wea_fe:latest

clone-be:
	@if [ ! -d "wea_be" ]; then \
		echo "Cloning backend repository..."; \
		git clone git@github.com:bouraci/wea_be.git wea_be; \
	else \
		echo "WEA BE repository already exists. Pulling latest changes..."; \
		cd wea_be && git pull origin master; \
	fi

build:
	@echo "Building WEA_BE image..."
	docker build -t hejsekvojtech/wea_be:latest wea_be
	@echo "Building WEA_FE image..."
	docker build -t hejsekvojtech/wea_fe:latest .

run:
	@echo "Running Docker Compose..."
	docker-compose -f docker-compose.yml up -d --build
