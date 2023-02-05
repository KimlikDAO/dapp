MAKEFLAGS := -j 8
PAGES := al ana incele iptal oyla

all: build

include tools/Makefile
include font/Makefile
include al/Makefile
include ana/Makefile
include birim/cüzdan/Makefile
include birim/tckt/Makefile
include incele/Makefile
include iptal/Makefile
include oyla/Makefile

clean:
	rm -rf build

dev:
	node tools/dev

staging: build
	tools/staging.py

cf-deployment: build build/prod.js build/sitemap tools/prod.toml
	tools/cfuploader.py
	wrangler publish \
        --config tools/prod.toml \
        --compatibility-date $(shell date +%Y-%m-%d)

.PHONY: cf-deployment clean dev staging
