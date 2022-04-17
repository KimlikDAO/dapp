build/al.page: build/al build/al.gz build/al.br

.PHONY: build/al.page

build/al.js: al/page.js al/ethereum.js
	mkdir -p build
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $^ \
	                        | uglifyjs -m -o $@

build/al.css: al/page.css
	mkdir -p build
	cat al/page.css | csso --output $@

build/al.keymap: build/al.js build/al.js.gz build/al.js.br \
                 build/al.css build/al.css.gz build/al.css.br
	rm -rf $@
	tools/keyhasher.py $@ build/al.js
	tools/keyhasher.py $@ build/al.css

build/al: build/ana.keymap build/al.keymap al/page.html
	cp al/page.html build/al.tmp
	tools/keymapper.py build/al.tmp build/ana.keymap build/al.keymap
	html-minifier -c tools/html-minifier.conf build/al.tmp > build/al
	rm build/al.tmp
