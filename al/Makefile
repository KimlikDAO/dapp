build/al.page: build/al build/al.gz build/al.br

.PHONY: build/al.page

build/al-wallet-inline.js: al/wallet-inline.js lib/ethereum.js
	mkdir -p build
	npx google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                        --js $^ \
                        --js_output_file $@
	npx uglifyjs $@ -m -o $@

build/al.js: al/page.js al/imeceİptal.js al/cüzdan.js \
             lib/dom.js lib/cevir.js lib/evm.js \
             lib/encrypt.js lib/ipfs.js lib/sha3.js \
             lib/ethereum.js lib/TCKT.js
	mkdir -p build
	npx google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                        --emit_use_strict \
                        --module_resolution NODE \
                        --assume_function_wrapper \
                        --dependency_mode PRUNE \
                        --entry_point $< \
                        --process_common_js_modules \
                        --js $^ \
                        --js_output_file $@
	npx uglifyjs $@ -m -o $@

build/al.css: al/page.css al/imeceİptal.css al/cüzdan.css
	mkdir -p build
	cat $^ | npx csso --output $@

build/al.keymap: build/al.js build/al.js.gz build/al.js.br \
                 build/al.css build/al.css.gz build/al.css.br
	rm -rf $@
	tools/keyhasher.py $@ build/al.js
	tools/keyhasher.py $@ build/al.css

build/al: al/page.html al/page.inlines \
          build/ana.keymap build/al.keymap build/al-wallet-inline.js 
	cp al/page.html build/al
	tools/keymapper.py build/al build/ana.keymap build/al.keymap al/page.inlines
	html-minifier -c tools/html-minifier.conf build/al -o build/al
