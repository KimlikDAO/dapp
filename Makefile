MAKEFLAGS=-j 4

build: build/serve.js build/ana.page build/al.page

include al/Makefile
include ana/Makefile
include iptal/Makefile
include ortaklar/Makefile

clean:
	rm -rf build

dev:
	node tools/dev

staging: build
	tools/staging.py

cf-deployment: build
	tools/cfuploader.py

build/serve.js: tools/serve.js tools/workers.js
	mkdir -p build
	npx google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $^ \
	                        --js_output_file $@
	npx uglifyjs $@ -m -o $@

.PHONY: cf-deployment clean dev staging

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
