build/ana.page: build/ana build/ana.gz build/ana.br

.PHONY: build/ana.page

build/ana.js: ana/page.js
	mkdir -p build
	npx google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                        --js $^ \
                        --js_output_file $@
	npx uglifyjs $@ -m -o $@

build/ana.css: ana/page.css
	mkdir -p build
	cat ana/page.css | npx csso --output $@

build/ana.keymap: build/ana.js build/ana.js.gz build/ana.js.br \
	              build/ana.css build/ana.css.gz build/ana.css.br
	rm -rf $@
	tools/keyhasher.py $@ build/ana.js
	tools/keyhasher.py $@ build/ana.css

build/ana: build/ana.keymap ana/page.html ana/page.inlines \
           ana/page.inlines ana/tr.svg
	cp ana/page.html build/ana
	tools/keymapper.py build/ana build/ana.keymap ana/page.inlines
	npx html-minifier -c tools/html-minifier.conf build/ana -o build/ana
