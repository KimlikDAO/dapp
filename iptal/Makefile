build/iptal/sayfa-%.js: iptal/sayfa.js \
                        birim/cüzdan/birim.js \
                        lib/crypto/secp256k1.js lib/crypto/modular.js \
                        lib/ethereum/provider.js lib/ethereum/jsonrpc.js \
                        lib/ethereum/evm.js lib/ethereum/TCKT.js \
                        lib/crypto/sha3.js \
                        lib/util/dom.js lib/util/çevir.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define TR=$(Lang-$*) \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@
	node tools/jsPostprocessor $@

build/iptal/sayfa.css: iptal/sayfa.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/iptal/sayfa.keymap: $(call compressions, build/iptal/sayfa.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/iptal/sayfa.css

build/iptal/sayfa-%.keymap: $(call compressions, build/iptal/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/iptal/sayfa-$*.js

build/iptal-%.html: iptal/sayfa.html \
                    birim/cüzdan.birim \
                    build/iptal/sayfa-%.keymap \
                    build/iptal/sayfa.keymap \
                    build/ana/sayfa-%.keymap \
                    build/font/fonts-%.keymap \
                    build/birim/cüzdan/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
