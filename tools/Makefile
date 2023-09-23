compressions = $(1) $(addsuffix .br, $(1)) $(addsuffix .gz, $(1))

removeLang = $(subst -tr,,$(subst -en,,$(1)))

Lang-en := false
Lang-tr := true

build/%.svg: %.svg tools/svgo-config.js
	mkdir -p $(dir $@)
	node tools/htmlProcessor $<
	yarn svgo --config tools/svgo-config.js $@ --output $@

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
