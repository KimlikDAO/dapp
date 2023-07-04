include sunucu/test/Makefile

PAGES := al ana incele iptal oyla

NAMED_ASSETS := sitemap.txt TCKT.svg

PAGE_TARGETS := $(addsuffix .sayfa, $(addprefix build/, $(PAGES)))

$(PAGE_TARGETS): build/%.sayfa: $(call compressions,build/%-en.html build/%-tr.html)

.PHONY: $(PAGE_TARGETS)

build: $(PAGE_TARGETS)

build/sunucu/prod.js: sunucu/prod.js sunucu/prod.d.js \
    lib/cloudflare/moduleWorker.d.js lib/cloudflare/types.d.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --jscomp_error=checkTypes \
                             --jscomp_error=strictCheckTypes \
                             --jscomp_error=unusedLocalVariables \
                             --jscomp_error=reportUnknownTypes \
                             --emit_use_strict \
                             --language_in ECMASCRIPT_NEXT \
                             --assume_function_wrapper \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -c toplevel,unsafe,drop_console -o $@
	sed -i.bak 's/globalThis.ProdWorker=/export default/g' $@
	wc $@

.PHONY: build/TCKT
build/TCKT: $(call compressions, build/TCKT.svg)

build/TCKT.svg: build/birim/tckt/görsel.svg
	mkdir -p $(dir $@)
	cp $< $@

al-en := mint
incele-en := view
oyla-en := vote
iptal-en := revoke

build/sitemap.txt:
	mkdir -p $(dir $@)
	echo "https://kimlikdao.org" > $@
	$(foreach s, $(filter-out ana, $(PAGES)), echo "https://kimlikdao.org/$s" >> $@;)
	$(foreach s, $(filter-out ana, $(PAGES)), echo "https://kimlikdao.org/$($s-en)" >> $@;)

build/sitemap: $(call compressions, build/sitemap.txt)

.PHONY: build/sitemap
