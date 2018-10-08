PROJECT := krakatoa-api
VERSION ?= develop

docker-build:
	docker build \
		-t radityasurya/$(PROJECT):$(VERSION) \
		.

docker-run:
	docker run \
		-v $(PWD):/app \
		-p 3001:3001 \
		radityasurya/$(PROJECT):$(VERSION)

compose:
	docker-compose up --build