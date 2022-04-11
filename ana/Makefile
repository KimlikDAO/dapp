build/ana.page: build/ana build/ana.gz build/ana.br

.PHONY: build/ana.page

build/ana.js: ana/page.js
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $^ \
	                        | uglifyjs -m -o $@

build/ana.css: ana/page.css
	cat ana/page.css | csso --output $@


build/ana.keymap: build/ana.js build/ana.js.gz build/ana.js.br \
	              build/ana.css build/ana.css.gz build/ana.css.br
	rm -rf $@
	tools/keyhasher.py $@ build/ana.js
	tools/keyhasher.py $@ build/ana.css

build/ana: build/ana.keymap ana/page.html
	cp ana/page.html build/ana.tmp
	# keymapper build/ana.keymap build/ana.tmp 
	html-minifier -c tools/html-minifier.conf build/ana.tmp > build/ana
	rm build/ana.tmp
