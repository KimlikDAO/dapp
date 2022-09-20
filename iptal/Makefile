build/iptal/sayfa-%.js: iptal/sayfa.js \
                        birim/cüzdan/birim.js \
                        lib/dom.js lib/TCKT.js lib/sha3.js lib/çevir.js \
                        lib/evm.js lib/ethereum.js
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
                    build/iptal/sayfa-%.keymap \
                    build/iptal/sayfa.keymap \
                    build/ana/sayfa-%.keymap \
                    build/font/fonts-%.keymap \
                    build/birim/cüzdan/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
