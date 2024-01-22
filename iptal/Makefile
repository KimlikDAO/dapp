iptal-en := revoke
iptal-tr := iptal

build/iptal/sayfa-%.js: iptal/sayfa.js \
    birim/ağlar/*.js \
    birim/cüzdan/*.js \
    birim/dil/birim.js \
    lib/crosschain/*.js \
    lib/crypto/sha3.js \
    lib/crypto/secp256k1.js lib/crypto/modular.js \
    lib/ethereum/*.d.js \
    lib/ethereum/evm.js lib/ethereum/TCKT.js \
    lib/ethereum/provider.js lib/ethereum/TCKTLite.js \
    lib/node/*.d.js lib/node/ipfs.js \
    lib/util/dom.js lib/util/çevir.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --jscomp_error=unusedLocalVariables \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --define "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(iptal-tr)" \
                             --define "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(iptal-en)" \
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
	mkdir -p $(dir $@)
	node lib/birimler/hasher $@ build/iptal/sayfa.css

build/iptal/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/iptal/sayfa-%.js)
	mkdir -p $(dir $@)
	node lib/birimler/hasher $@ build/iptal/sayfa-$*.js
	cat $< >> $@

build/iptal-%.html: iptal/sayfa.html \
                    build/iptal/sayfa-%.keymap \
                    build/iptal/sayfa.keymap \
                    birim/başlık.birim \
                    birim/favicon.birim \
                    birim/lato-%.birim
	node lib/birimler/işleyici $< $*
