oyla-en := vote
oyla-tr := oyla

build/oyla/sayfa-%.js: oyla/sayfa.js \
                       birim/ağlar/*.js \
                       birim/cüzdan/*.js \
                       birim/dil/birim.js \
                       lib/crosschain/*.js \
                       lib/crypto/sha3.js \
                       lib/crypto/secp256k1.js lib/crypto/modular.js \
                       lib/ethereum/*.d.js \
                       lib/ethereum/evm.js lib/ethereum/TCKT.js \
                       lib/ethereum/provider.js lib/ethereum/TCKTLite.js \
                       lib/mina/*.d.js \
                       lib/node/*.d.js lib/node/ipfs.js \
                       lib/util/dom.js lib/util/çevir.js
	mkdir -p $(dir $@)
	bun google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --define "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(oyla-tr)" \
                             --define "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(oyla-en)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	bun uglifyjs $@ -m -c toplevel,unsafe -o $@
	wc $@

build/oyla/sayfa.css: oyla/sayfa.css oyla/*/*.css
	mkdir -p $(dir $@)
	cat $^ | bun csso --output $@

build/oyla/sayfa.keymap: $(call compressions, build/oyla/sayfa.css)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/oyla/sayfa.css

build/oyla/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/oyla/sayfa-%.js)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/oyla/sayfa-$*.js
	cat $< >> $@

build/oyla-%.html: oyla/sayfa.html \
                   build/oyla/sayfa.keymap \
                   build/oyla/sayfa-%.keymap \
                   birim/başlık.birim \
                   birim/favicon.birim \
                   birim/lato-%.birim \
                   build/oyla/dropdownok.isvg
	bun lib/birimler/işleyici.js $< $*
