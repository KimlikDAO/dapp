MAKEFLAGS=-j 4

build: build/serve.js build/ana.page build/al.page

include ana/Makefile
include al/Makefile
include iptal/Makefile
include ortaklar-locası/Makefile

clean:
	rm -rf build

dev:
	tools/dev.py

cf-deployment: build
	tools/cfuploader.py

build/serve.js: serve.js workers.js
	mkdir -p build
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $^ | uglifyjs -m -o $@

.PHONY: clean payload dev

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
