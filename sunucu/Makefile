PAGES := al ana kpassim iptal oyla

NAMED_ASSETS := sitemap.txt TCKT.svg TCKT.png TCKT.webp KPASS.svg KPASS.png KPASS.webp

PAGE_TARGETS := $(addsuffix .sayfa, $(PAGES))

$(PAGE_TARGETS): %.sayfa: $(call compressions,build/%-en.html build/%-tr.html)

.PHONY: $(PAGE_TARGETS)

build: $(PAGE_TARGETS)

build/sunucu/prod.js: sunucu/prod.js
	bun lib/kdjs/kdjs.js $< -o $@ --strict --nologs

build/sitemap.txt:
	mkdir -p $(dir $@)
	echo "https://kimlikdao.org" > $@
	$(foreach s, $(filter-out ana, $(PAGES)), echo "https://kimlikdao.org/$s" >> $@;)
	$(foreach s, $(filter-out ana, $(PAGES)), echo "https://kimlikdao.org/$($s-en)" >> $@;)

build/sitemap: $(call compressions, build/sitemap.txt)

.PHONY: build/sitemap

dev: lib/birimler/devSunucu.js sunucu/dev.toml
	bun $< --çalıştır sunucu/dev.toml

🦜: kanarya

kanarya: lib/birimler/kanaryaSunucu.js build sunucu/dev.toml
	bun $< --çalıştır sunucu/dev.toml

cf-deployment: lib/cloudflare/uploader.js build \
    build/sunucu/prod.js \
    build/sitemap \
    sunucu/prod.toml
	bun lib/cloudflare/uploader.js sunucu/prod.toml sunucu/Makefile
	bun wrangler deploy \
        --config sunucu/prod.toml \
        --compatibility-date $(shell date -v -1d +%Y-%m-%d)

.PHONY: cf-deployment dev kanarya
