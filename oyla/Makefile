build/oyla/sayfa-%.js: oyla/sayfa.js \
                       birim/cüzdan/birim.js \
                       lib/crypto/sha3.js \
                       lib/crypto/secp256k1.js lib/crypto/modular.js \
                       lib/ethereum/provider.d.js lib/ethereum/transaction.d.js \
                       lib/ethereum/logs.d.js \
                       lib/ethereum/evm.js lib/ethereum/TCKT.js \
                       lib/util/dom.js lib/util/çevir.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -c toplevel,unsafe -o $@
	wc $@

build/oyla/sayfa.css: oyla/sayfa.css oyla/*/*.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/oyla/sayfa.keymap: $(call compressions, build/oyla/sayfa.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/oyla/sayfa.css

build/oyla/sayfa-%.keymap: $(call compressions, build/oyla/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/oyla/sayfa-$*.js

build/oyla-%.html: oyla/sayfa.html \
                   birim/cüzdan.birim \
                   birim/logo.birim \
                   build/oyla/sayfa.keymap \
                   build/oyla/sayfa-%.keymap \
                   build/ana/sayfa-%.keymap \
                   build/birim/cüzdan/birim.keymap \
                   build/birim/paralar/birim.keymap \
                   build/font/fonts-%.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
