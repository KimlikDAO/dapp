kpassim-en := kpass
kpassim-tr := kpassim

build/kpassim/sayfa-%.js: kpassim/sayfa.js kpassim/pencere/*.js \
    kpassim/discord.d.js kpassim/discord.js \
    birim/ağlar/*.js \
    birim/cüzdan/*.js \
    birim/dil/birim.js \
    birim/kpass/birim.js \
    lib/api/jsonrpc.d.js lib/api/jsonrpc.js \
    lib/crosschain/*.js \
    lib/crypto/*.js \
    lib/did/*.js \
    lib/ethereum/*.js \
    lib/mina/*.d.js \
    lib/node/*.d.js lib/node/ipfs.js \
    lib/util/dom.js lib/util/çevir.js lib/util/base58.js
	mkdir -p $(dir $@)
	bun google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --define "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(kpassim-tr)" \
                             --define "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(kpassim-en)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	bun uglifyjs $@ -m -o $@
	bun lib/birimler/bigintCompressor.js $@
	wc $@

build/kpassim/sayfa.css: kpassim/sayfa.css kpassim/*/*.css birim/kutu.css
	mkdir -p $(dir $@)
	cat $^ | bun csso --output $@

build/kpassim/sayfa.keymap: $(call compressions, build/kpassim/sayfa.css)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/kpassim/sayfa.css

build/kpassim/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/kpassim/sayfa-%.js)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/kpassim/sayfa-$*.js
	cat $< >> $@

build/kpassim-%.html: kpassim/sayfa.html \
                    build/kpassim/sayfa-%.keymap \
                    build/kpassim/sayfa.keymap \
                    birim/başlık.birim \
                    birim/favicon.birim \
                    birim/lato-%.birim \
                    birim/kpass.birim \
                    build/al/paste.isvg
	bun lib/birimler/işleyici.js $< $*
