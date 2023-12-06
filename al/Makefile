include al/ödeme/Makefile
include al/tanışma/Makefile

al-en := mint
al-tr := al

build/al/sayfa-%.js: al/sayfa.js \
                     al/imeceİptal/birim.js al/ödeme/birim.js \
                     al/tanışma/birim.js \
                     birim/cüzdan/*.js \
                     birim/dil/birim.js \
                     birim/telefon/birim.js \
                     birim/tckt/birim.js \
                     lib/crosschain/*.js \
                     lib/crypto/sha3.js \
                     lib/crypto/secp256k1.js lib/crypto/modular.js \
                     lib/crypto/primes.js lib/crypto/wesolowski.js \
                     lib/did/*.js \
                     lib/ethereum/*.js \
                     lib/node/*.d.js \
                     lib/node/ipfs.js lib/node/network.js \
                     lib/util/dom.js lib/util/çevir.js \
                     build/al/tanışma/birim.keymap
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --define "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(al-tr)" \
                             --define "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(al-en)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $(filter %.js,$^) \
                             --js_output_file $@
	lib/birimler/keymapper.py $@ $(filter %.keymap,$^)
	yarn uglifyjs $@ -m -c toplevel,unsafe -o $@
	wc $@

build/al/sayfa.css: al/sayfa.css al/*/*.css birim/kutu.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/al/sayfa.keymap: $(call compressions, build/al/sayfa.css)
	mkdir -p $(dir $@) && > $@
	node lib/birimler/hasher $@ build/al/sayfa.css

build/al/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/al/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	node lib/birimler/hasher $@ build/al/sayfa-$*.js
	cat $< >> $@

build/al-%.html: al/sayfa.html \
                 al/imeceİptal/birim.html \
                 al/ödeme.birim \
                 al/tanışma.birim \
                 build/al/sayfa-%.keymap \
                 build/al/sayfa.keymap \
                 build/al/paste.isvg \
                 build/al/tanışma/external-link.isvg \
                 birim/başlık.birim \
                 birim/favicon.birim \
                 birim/lato-%.birim \
                 birim/tckt.birim \
                 birim/telefon.birim
	node lib/birimler/işleyici $< $*
	yarn html-minifier -c lib/birimler/htmlMinifierConfig.json $@ -o $@
