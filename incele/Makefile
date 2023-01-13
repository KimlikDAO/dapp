build/incele/sayfa-%.js: incele/sayfa.js \
                         birim/cüzdan/birim.js \
                         birim/tckt/birim.js \
                         lib/crypto/*.js \
                         lib/did/*.js \
                         lib/ethereum/*.js \
                         lib/node/ipfs.d.js lib/node/ipfs.js \
                         lib/node/nvi.d.js lib/node/error.d.js \
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
	yarn uglifyjs $@ -m -o $@

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
