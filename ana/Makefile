build/ana.page: build/ana build/ana.gz build/ana.br

.PHONY: build/ana.page

build/ana.js: ana/page.js
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $^ \
	                        | uglifyjs -m -o $@

build/ana.keymap: build/ana.js build/ana.js.gz build/ana.js.br
	touch build/ana.keymap

build/ana: build/ana.keymap ana/page.html
	cp ana/page.html build/ana.tmp
	# keymapper build/ana.keymap build/ana.tmp 
	html-minifier -c tools/html-minifier.conf build/ana.tmp > build/ana
	rm build/ana.tmp
