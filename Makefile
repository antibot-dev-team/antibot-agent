.PHONY: install lint build

# Local dev environment
install:
	npm install

lint:
	npm run-script lint

build: lint
	npm run-script build
