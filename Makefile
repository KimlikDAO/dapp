MAKEFLAGS := -j 8

all: build

include tools/Makefile
include al/Makefile
include ana/Makefile
include birim/Makefile
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

cf-deployment: build build/sunucu/prod.js build/sitemap build/TCKT sunucu/prod.toml
	tools/cfuploader.py sunucu/prod.toml sunucu/Makefile
	wrangler deploy \
        --config sunucu/prod.toml \
        --compatibility-date $(shell date -v -1d +%Y-%m-%d)

.PHONY: cf-deployment clean dev staging
