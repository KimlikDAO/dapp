include al/ödeme/Makefile

JsDeps_al/sayfa := al/sayfa.js \
                   al/imeceİptal/birim.js al/ödeme/birim.js \
                   al/tanışma/birim.js \
                   birim/cüzdan/birim.js \
                   birim/telefon/birim.js \
                   birim/tckt/birim.js \
                   lib/dom.js lib/çevir.js lib/evm.js \
                   lib/encrypt.js lib/ipfs.js lib/sha3.js \
                   lib/ethereum.js lib/TCKT.js lib/TCKTData.js

build/al/bağla-%.js.inl: al/bağla.js lib/ethereum.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define TR=$(Lang-$*) \
                             --assume_function_wrapper \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

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
                 al/tanışma/birim.html \
                 birim/telefon/birim.html \
                 birim/cüzdan.birim \
                 build/al/bağla-%.js.inl \
                 build/al/imeceİptal/paste.svg.inl \
                 build/al/ödeme/birim.keymap \
                 build/al/sayfa-%.keymap \
                 build/al/sayfa.keymap \
                 build/ana/sayfa-%.keymap \
                 build/font/fonts-%.keymap \
                 build/birim/cüzdan/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
