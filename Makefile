.PHONY: install lint build

# Local dev environment
install:
	npm ci

lint:
	npm run-script lint

build: lint
	npm run-script build

run:
	python3 -m http.server 8080