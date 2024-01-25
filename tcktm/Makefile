tcktm-en := my-tckt
tcktm-tr := tcktm

build/tcktm/sayfa-%.js: tcktm/sayfa.js tcktm/pencere/*.js \
    tcktm/discord.d.js tcktm/discord.js \
    birim/ağlar/*.js \
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
	bun google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --define "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(tcktm-tr)" \
                             --define "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(tcktm-en)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	bun uglifyjs $@ -m -o $@

build/tcktm/sayfa.css: tcktm/sayfa.css tcktm/*/*.css birim/kutu.css
	mkdir -p $(dir $@)
	cat $^ | bun csso --output $@

build/tcktm/sayfa.keymap: $(call compressions, build/tcktm/sayfa.css)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/tcktm/sayfa.css

build/tcktm/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/tcktm/sayfa-%.js)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/tcktm/sayfa-$*.js
	cat $< >> $@

build/tcktm-%.html: tcktm/sayfa.html \
                    build/tcktm/sayfa-%.keymap \
                    build/tcktm/sayfa.keymap \
                    birim/başlık.birim \
                    birim/favicon.birim \
                    birim/lato-%.birim \
                    birim/tckt.birim \
                    build/al/paste.isvg
	bun lib/birimler/işleyici.js $< $*
