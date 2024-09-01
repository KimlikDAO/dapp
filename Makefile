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

.PHONY: clean

PAGES := al ana kpassim iptal oyla

NAMED_ASSETS := sitemap.txt TCKT.svg TCKT.png TCKT.webp KPASS.svg KPASS.png KPASS.webp

PAGE_TARGETS := $(addsuffix .sayfa, $(PAGES))

$(PAGE_TARGETS): %.sayfa: $(call compressions,build/%-en.html build/%-tr.html)

.PHONY: $(PAGE_TARGETS)

build: $(PAGE_TARGETS)

dev: lib/birimler/sunucu/dev.js
	bun $<

🦜: kanarya

kanarya: lib/birimler/sunucu/canary.js build
	bun $<
