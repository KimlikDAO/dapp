build/al/wallet-inline.js: al/wallet-inline.js lib/ethereum.js
	mkdir -p build/al
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/al/sayfa.js: al/sayfa.js al/imeceİptal.js birim/cüzdan.js \
                   lib/dom.js lib/çevir.js lib/evm.js \
                   lib/encrypt.js lib/ipfs.js lib/sha3.js \
                   lib/ethereum.js lib/TCKT.js lib/TCKTData.js
	mkdir -p build/al
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --process_common_js_modules \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/al/sayfa.css: al/sayfa.css al/imeceİptal.css birim/cüzdan/birim.css
	mkdir -p build/al
	cat $^ | yarn csso --output $@

INLINE_SVGS = avalanche.svg \
              copy.svg external-link.svg debank.svg \
              paste.svg

INL_SVGS = $(addprefix build/inl/, $(INLINE_SVGS))

REQUEST_SVGS = $(filter-out $(INLINE_SVGS), $(notdir $(wildcard al/img/*.svg)))

REQ_SVGS = $(addprefix build/al/img/, $(REQUEST_SVGS))

$(INL_SVGS): build/inl/%.svg: al/img/%.svg
	mkdir -p build/inl
	yarn svgo --config tools/svgo-inline-config.js $^ --output $@

$(REQ_SVGS): build/al/img/%.svg: al/img/%.svg
	mkdir -p build/al/img
	yarn svgo --config tools/svgo-config.js $^ --output $@

build/al/sayfa.keymap: $(call compressions, build/al/sayfa.js) \
                       $(call compressions, build/al/sayfa.css) \
                       $(call compressions, $(REQ_SVGS))
	rm -rf $@
	tools/keyhasher.py $@ build/al/sayfa.js build/al/sayfa.css $(REQ_SVGS)

build/al.html: al/sayfa.html al/sayfa.inlines \
               build/ana/sayfa.keymap build/al/sayfa.keymap \
               build/al/wallet-inline.js
	cp $< $@
	tools/keymapper.py $@ build/ana/sayfa.keymap build/al/sayfa.keymap al/sayfa.inlines
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
