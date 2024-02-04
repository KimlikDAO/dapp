PAGES := al ana tcktm iptal oyla

NAMED_ASSETS := sitemap.txt TCKT.svg TCKT.png TCKT.webp

PAGE_TARGETS := $(addsuffix .sayfa, $(PAGES))

$(PAGE_TARGETS): %.sayfa: $(call compressions,build/%-en.html build/%-tr.html)

.PHONY: $(PAGE_TARGETS)

build: $(PAGE_TARGETS)

build/sunucu/prod.js: sunucu/prod.js \
    lib/cloudflare/moduleWorker.d.js lib/cloudflare/types.d.js \
    lib/cloudflare/pageWorker.d.js lib/cloudflare/pageWorker.js
	mkdir -p $(dir $@)
	bun google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --jscomp_error=checkTypes \
                             --jscomp_error=strictCheckTypes \
                             --jscomp_error=unusedLocalVariables \
                             --jscomp_error=reportUnknownTypes \
                             --emit_use_strict \
                             --language_in ECMASCRIPT_NEXT \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	bun uglifyjs $@ -m -c toplevel,unsafe,drop_console -o $@
	sed -i.bak 's/globalThis.ProdWorker=/export default/g' $@
	wc $@

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
