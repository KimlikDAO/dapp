build/al.page: build/al build/al.gz build/al.br

.PHONY: build/al.page

build/al.js: al/page.js \
             lib/cevir.js lib/evm.js lib/encrypt.js \
             lib/ipfs.js lib/sha3.js \
             lib/ethereum.js lib/TCKT.js
	mkdir -p build
	google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
	                        --emit_use_strict \
	                        --module_resolution NODE \
	                        --assume_function_wrapper \
	                        --dependency_mode PRUNE \
	                        --entry_point $< \
	                        --process_common_js_modules \
	                        --js $^ \
	                        --js_output_file $@
	uglifyjs $@ -m -o $@

build/al.css: al/page.css
	mkdir -p build
	cat al/page.css | csso --output $@

build/al.keymap: build/al.js build/al.js.gz build/al.js.br \
                 build/al.css build/al.css.gz build/al.css.br
	rm -rf $@
	python tools/keyhasher.py $@ build/al.js
	python tools/keyhasher.py $@ build/al.css

build/al: build/ana.keymap build/al.keymap al/page.html
	cp al/page.html build/al.tmp
	python tools/keymapper.py build/al.tmp build/ana.keymap build/al.keymap
	html-minifier -c tools/html-minifier.conf build/al.tmp > build/al
	rm build/al.tmp
