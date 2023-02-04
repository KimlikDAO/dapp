include al/ödeme/Makefile
include al/tanışma/Makefile

build/al/sayfa-%.js: al/sayfa.js \
                     al/imeceİptal/birim.js al/ödeme/birim.js \
                     al/tanışma/birim.js \
                     birim/cüzdan/birim.js \
                     birim/telefon/birim.js \
                     birim/tckt/birim.js \
                     lib/crypto/sha3.js \
                     lib/crypto/secp256k1.js lib/crypto/modular.js \
                     lib/crypto/primes.js lib/crypto/wesolowski.js \
                     lib/did/*.d.js lib/did/TCKTVerisi.js \
                     lib/did/section.js lib/did/decryptedSections.js \
                     lib/did/verifiableID.js \
                     lib/ethereum/*.js \
                     lib/node/ipfs.d.js lib/node/ipfs.js lib/node/network.js \
                     lib/node/nvi.d.js lib/node/error.d.js \
                     lib/util/dom.js lib/util/çevir.js \
                     build/al/tanışma/birim.keymap
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $(filter %.js,$^) \
                             --js_output_file $@
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn uglifyjs $@ -m -c toplevel,unsafe -o $@
	wc $@

build/al/sayfa.css: al/sayfa.css al/*/*.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/al/sayfa.keymap: $(call compressions, build/al/sayfa.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/al/sayfa.css

build/al/sayfa-%.keymap: $(call compressions, build/al/sayfa-%.js)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/al/sayfa-$*.js

build/al-%.html: al/sayfa.html \
                 al/imeceİptal/birim.html \
                 al/ödeme/birim.html \
                 al/tanışma.birim \
                 birim/telefon/birim.html \
                 birim/cüzdan.birim \
                 build/al/paste.svg.inl \
                 build/al/tanışma/external-link.svg.inl \
                 build/al/ödeme/birim.keymap \
                 build/al/sayfa-%.keymap \
                 build/al/sayfa.keymap \
                 build/al/tanışma/birim.keymap \
                 build/ana/sayfa-%.keymap \
                 build/font/fonts-%.keymap \
                 build/birim/cüzdan/birim.keymap \
                 build/birim/tckt/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
