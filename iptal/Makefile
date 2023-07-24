build/iptal/sayfa-%.js: iptal/sayfa.js \
                        birim/cüzdan/birim.js \
                        birim/dil/birim.js \
                        lib/crypto/sha3.js \
                        lib/crypto/secp256k1.js lib/crypto/modular.js \
                        lib/ethereum/transaction.d.js lib/ethereum/provider.d.js \
                        lib/ethereum/logs.d.js lib/ethereum/evm.js lib/ethereum/TCKT.js \
                        lib/util/dom.js lib/util/çevir.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --jscomp_error=unusedLocalVariables \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

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
                    birim/dil/birim.html \
                    build/iptal/sayfa-%.keymap \
                    build/iptal/sayfa.keymap \
                    build/ana/sayfa-%.keymap \
                    build/font/fonts-%.keymap \
                    build/birim/cüzdan/birim.keymap \
                    build/birim/dil/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
