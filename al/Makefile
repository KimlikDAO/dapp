build/inl/wallet-inline.js: al/wallet-inline.js lib/ethereum.js
	mkdir -p build/inl
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/al/page.js: al/page.js al/imeceİptal.js al/cüzdan.js \
                  lib/dom.js lib/cevir.js lib/evm.js \
                  lib/encrypt.js lib/ipfs.js lib/sha3.js \
                  lib/ethereum.js lib/TCKT.js
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

build/al/page.css: al/page.css al/imeceİptal.css al/cüzdan.css
	mkdir -p build/al
	cat $^ | yarn csso --output $@

INLINE_SVGS = avalanche.svg copy.svg external-link.svg debank.svg

INL_SVGS = $(addprefix build/inl/, $(INLINE_SVGS))

REQUEST_SVGS = $(filter-out $(INLINE_SVGS), $(notdir $(wildcard al/img/*.svg)))

REQ_SVGS = $(addprefix build/al/img/, $(REQUEST_SVGS))

$(INL_SVGS): build/inl/%.svg: al/img/%.svg
	mkdir -p build/inl
	yarn svgo --config tools/svgo-inline-config.js $^ --output $@

$(REQ_SVGS): build/al/img/%.svg: al/img/%.svg
	mkdir -p build/al/img
	yarn svgo --config tools/svgo-config.js $^ --output $@

build/al/page.keymap: $(call compressions, build/al/page.js) \
                      $(call compressions, build/al/page.css) \
                      $(call compressions, $(REQ_SVGS))
	rm -rf $@
	tools/keyhasher.py $@ build/al/page.js build/al/page.css $(REQ_SVGS)

build/al.html: al/page.html al/page.inlines \
               build/ana/page.keymap build/al/page.keymap \
               build/inl/wallet-inline.js \
               $(INL_SVGS)
	cp $< $@
	echo $^
	tools/keymapper.py $@ build/ana/page.keymap build/al/page.keymap al/page.inlines
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
