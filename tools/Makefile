compressions = $(1) $(addsuffix .br, $(1)) $(addsuffix .gz, $(1))

PAGE_TARGETS := $(addsuffix .sayfa, $(addprefix build/, $(PAGES)))

$(PAGE_TARGETS): build/%.sayfa: $(call compressions,build/%-en.html build/%-tr.html)

.PHONY: $(PAGE_TARGETS)

build: $(PAGE_TARGETS)

removeLang = $(subst -tr,,$(subst -en,,$(1)))

Lang-en := false
Lang-tr := true

build/prod.js: tools/prod.js tools/prod.d.js \
    lib/cloudflare/moduleWorker.d.js lib/cloudflare/types.d.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --emit_use_strict \
                             --language_in ECMASCRIPT_NEXT \
                             --module_resolution NODE \
                             --dependency_mode PRUNE \
                             --assume_function_wrapper \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@
	sed -i.bak 's/globalThis.Worker=/export default/g' $@

al-en := get
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

build/%.svg: %.svg tools/svgo-config.js
	mkdir -p $(dir $@)
	yarn svgo --config tools/svgo-config.js $< --output $@

build/%.svg.inl: %.svg tools/svgo-inline-config.js
	mkdir -p $(dir $@)
	yarn svgo --config tools/svgo-inline-config.js $< --output $@

%.gz: %
	cp $< $@.tmp
	touch -d 2022-01-01T00:00:00 $@.tmp
	zopfli --force --best --i20 $@.tmp
	mv $@.tmp.gz $<.gz
	rm -f $@.tmp

%.br: %
	cp $< $@.tmp
	touch -d 2022-01-01T00:00:00 $@.tmp
	brotli --force -w 24 --quality=11 --rm --output=$@ $@.tmp
	touch $@

.SECONDARY:
