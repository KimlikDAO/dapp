MAKEFLAGS := -j 8

all: build

include lib/birimler/Makefile
include al/Makefile
include ana/Makefile
include birim/Makefile
include iptal/Makefile
include kpassim/Makefile
include oyla/Makefile

clean:
	rm -rf build

.PHONY: clean build

PAGES := al ana kpassim iptal oyla

NAMED_ASSETS := sitemap.txt TCKT.svg TCKT.png TCKT.webp KPASS.svg KPASS.png KPASS.webp

build: ana.sayfa al.sayfa kpassim.sayfa iptal.sayfa oyla.sayfa

dev: lib/birimler/sunucu/dev.js
	bun $<

🦜: kanarya

kanarya: lib/birimler/sunucu/canary.js build
	bun $<
