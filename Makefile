all: build/index.html build/index.html.gz build/index.html.br

runnocompile:
	python3 py/testserv.py

build/index.html: src/index.html
	mkdir -p build
	cp src/index.html build/tmp.html
	html-minifier -c htmlminifier.conf build/tmp.html > build/index.html
	rm build/tmp.html

clean:
	rm -rf build

.PHONY: clean

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
