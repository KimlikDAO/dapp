build/incele/sayfa-%.js: incele/sayfa.js \
                         birim/cüzdan/birim.js \
                         birim/tckt/birim.js \
                         lib/api/edevletApi.js \
                         lib/crypto/sha3.js lib/crypto/ed25519.js \
                         lib/crypto/secp256k1.js lib/crypto/modular.js \
                         lib/did/types.js lib/did/TCKTBölümleri.js \
                         lib/did/TCKTVerisi.js lib/did/section.js \
                         lib/ethereum/provider.js lib/ethereum/jsonrpc.js \
                         lib/ethereum/evm.js lib/ethereum/TCKT.js \
                         lib/ethereum/ERC721Unlockable.js lib/ethereum/unlockables.js \
                         lib/ipfs.js \
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

build/incele/sayfa.css: incele/sayfa.css incele/*/*.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/incele/sayfa.keymap: $(call compressions, build/incele/sayfa.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/incele/sayfa.css

build/incele/sayfa-%.keymap: $(call compressions, build/incele/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/incele/sayfa-$*.js

build/incele-%.html: incele/sayfa.html \
                     birim/cüzdan.birim \
                     birim/tckt/birim.html \
                     build/al/paste.svg.inl \
                     build/incele/sayfa-%.keymap \
                     build/incele/sayfa.keymap \
                     build/ana/sayfa-%.keymap \
                     build/font/fonts-%.keymap \
                     build/birim/cüzdan/birim.keymap \
                     build/birim/tckt/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
