MAKEFLAGS := -j 8
PAGES := al ana incele iptal oyla

all: build

include tools/Makefile
include al/Makefile
include ana/Makefile
include birim/cüzdan/Makefile
include birim/dil/Makefile
include birim/tckt/Makefile
include font/Makefile
include incele/Makefile
include iptal/Makefile
include oyla/Makefile
include sunucu/Makefile

clean:
	rm -rf build

dev:
	node sunucu/dev.js

staging: build
	sunucu/staging.py

cf-deployment: build build/sunucu/prod.js build/sitemap build/TCKT.assets sunucu/prod.toml
	tools/cfuploader.py
	wrangler deploy \
        --config sunucu/prod.toml \
        --compatibility-date $(shell date -v -1d +%Y-%m-%d)

.PHONY: cf-deployment clean dev staging
