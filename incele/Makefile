incele-en := view
incele-tr := incele

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
                             --define "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(incele-tr)" \
                             --define "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(incele-en)" \
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
	node lib/birimler/hasher $@ build/incele/sayfa.css

build/incele/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/incele/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	node lib/birimler/hasher $@ build/incele/sayfa-$*.js
	cat $< >> $@

build/incele-%.html: incele/sayfa.html \
                     build/incele/sayfa-%.keymap \
                     build/incele/sayfa.keymap \
                     birim/başlık.birim \
                     birim/favicon.birim \
                     birim/lato-%.birim \
                     birim/tckt.birim \
                     build/al/paste.isvg
	node lib/birimler/işleyici $< $*
	yarn html-minifier -c lib/birimler/htmlMinifierConfig.json $@ -o $@
