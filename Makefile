MAKEFLAGS=-j 4

PAGES = al ana

compressions = $(1) $(addsuffix .br, $(1)) $(addsuffix .gz, $(1))

all: build

include al/Makefile
include ana/Makefile
include iptal/Makefile
include ortaklar/Makefile

PAGE_TARGETS = $(addsuffix .page, $(addprefix build/, $(PAGES)))

$(PAGE_TARGETS): build/%.page: build/%.html build/%.html.gz build/%.html.br

build: build/serve.js build/ana.page build/al.page

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
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                        --assume_function_wrapper \
                        --js $^ \
                        --js_output_file $@
	npx uglifyjs $@ -m -o $@

.PHONY: cf-deployment clean dev staging $(PAGE_TARGETS)

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
