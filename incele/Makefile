build/incele/sayfa-%.js: incele/sayfa.js \
    birim/cüzdan/*.js \
    birim/dil/birim.js \
    birim/tckt/birim.js \
    lib/crosschain/*.js \
    lib/crypto/*.js \
    lib/did/*.js \
    lib/ethereum/*.js \
    lib/node/*.d.js lib/node/ipfs.js \
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

build/incele/sayfa.css: incele/sayfa.css incele/*/*.css birim/kutu.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/incele/sayfa.keymap: $(call compressions, build/incele/sayfa.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/incele/sayfa.css

build/incele/sayfa-%.keymap: $(call compressions, build/incele/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/incele/sayfa-$*.js

build/incele-%.html: incele/sayfa.html \
                     birim/başlık.birim \
                     birim/favicon.birim \
                     birim/lato.birim \
                     birim/tckt.birim \
                     build/al/paste.svg.inl \
                     build/incele/sayfa-%.keymap \
                     build/incele/sayfa.keymap \
                     build/ana/sayfa-%.keymap \
                     build/birim/cüzdan/birim.keymap \
                     build/birim/dil/birim.keymap \
                     build/birim/favicon/birim.keymap \
                     build/birim/lato/l400.keymap \
                     build/birim/lato/l700-%.keymap \
                     build/birim/tckt/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
