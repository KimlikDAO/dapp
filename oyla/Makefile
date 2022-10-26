build/oyla/sayfa-%.js: oyla/sayfa.js \
                       birim/cüzdan/birim.js \
                       lib/util/dom.js lib/util/çevir.js \
                       lib/crypto/sha3.js \
                       lib/ethereum/provider.js lib/ethereum/evm.js lib/ethereum/TCKT.js
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
                   build/oyla/sayfa.keymap \
                   build/oyla/sayfa-%.keymap \
                   build/ana/sayfa-%.keymap \
                   build/birim/cüzdan/birim.keymap \
                   build/font/fonts-%.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
