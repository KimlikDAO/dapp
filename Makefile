MAKEFLAGS := -j 8
PAGES := al ana incele

all: build

include tools/Makefile
include font/Makefile
include al/Makefile
include ana/Makefile
include birim/cüzdan/Makefile
include incele/Makefile
include iptal/Makefile

clean:
	rm -rf build

dev:
	node tools/dev

staging: build
	tools/staging.py

cf-deployment: build build/prod.js build/sitemap
	tools/cfuploader.py

.PHONY: cf-deployment clean dev staging
