PAGE_TARGETS := $(addsuffix .sayfa, $(addprefix build/, $(PAGES)))

$(PAGE_TARGETS): build/%.sayfa: build/%.html build/%.html.gz build/%.html.br

compressions = $(1) $(addsuffix .br, $(1)) $(addsuffix .gz, $(1))

.PHONY: $(PAGE_TARGETS)

build/prod.js: tools/prod.js tools/workers.js
	mkdir -p build
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --assume_function_wrapper \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/%.svg: %.svg
	mkdir -p $(dir $@)
	yarn svgo --config tools/svgo-config.js $^ --output $@

build/%.svg.inl: %.svg
	mkdir -p $(dir $@)
	yarn svgo --config tools/svgo-inline-config.js $^ --output $@

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
