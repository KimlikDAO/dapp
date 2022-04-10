build/al.page: build/al build/al.gz build/al.br

.PHONY: build/al.page

build/al.js: al/page.js
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --js $^ \
							| uglifyjs -m -o $@

build/al.keymap: build/al.js
	tools/keyhasher $@ $^

build/al: build/al.keymap
	cp al/page.html build/al.tmp
	# keymapper build/al.keymap build/al.tmp 
	html-minifier -c tools/html-minifier.conf build/al.tmp > build/al
	rm build/al.tmp
