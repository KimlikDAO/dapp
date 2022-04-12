build/al.page: build/al build/al.gz build/al.br

.PHONY: build/al.page

build/al.js: al/page.js
	mkdir -p build
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $< \
	                        | uglifyjs -m -o $@

build/al.keymap: build/al.js build/al.js.gz build/al.js.br
	rm -rf $@
	tools/keyhasher.py $@ build/al.js

build/al: build/ana.keymap build/al.keymap al/page.html
	cp al/page.html build/al.tmp
	tools/keymapper.py build/al.tmp build/ana.keymap build/al.keymap
	html-minifier -c tools/html-minifier.conf build/al.tmp > build/al
	rm build/al.tmp
