package: build build/ana-page build/al-page build/iptal-page

include ana/Makefile
include al/Makefile
include iptal/Makefile
include ortaklar-locası/Makefile

build:
	mkdir -p build

clean:
	rm -rf build

.PHONY: clean package

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
