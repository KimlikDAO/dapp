build/al/wallet-inline.js: al/wallet-inline.js lib/ethereum.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --assume_function_wrapper \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/al/sayfa.js: al/sayfa.js al/imeceİptal/birim.js al/ödeme/birim.js \
                   birim/cüzdan/birim.js birim/telefon/birim.js \
                   lib/dom.js lib/çevir.js lib/evm.js \
                   lib/encrypt.js lib/ipfs.js lib/sha3.js \
                   lib/ethereum.js lib/TCKT.js lib/TCKTData.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/al/sayfa.css: al/sayfa.css al/imeceİptal/birim.css
	mkdir -p build/al
	cat $^ | yarn csso --output $@

ASSETS = build/al/sayfa.css build/al/sayfa.js
build/al/sayfa.keymap: $(call compressions, $(ASSETS))
	rm -rf $@
	tools/keyhasher.py $@ $(ASSETS)

build/al.html: al/sayfa.html al/sayfa.inlines \
               build/ana/sayfa.keymap build/al/sayfa.keymap \
               build/al/wallet-inline.js \
               al/imeceİptal/birim.html \
               build/al/imeceİptal/paste.svg.inl \
               birim/telefon/birim.html \
               build/birim/cüzdan/birim.html
	cp $< $@
	tools/keymapper.py $@ build/ana/sayfa.keymap build/al/sayfa.keymap al/sayfa.inlines
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
