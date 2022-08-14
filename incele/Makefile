JsDeps_incele/sayfa := incele/sayfa.js \
                       birim/cüzdan/birim.js \
                       birim/tckt/birim.js \
                       lib/dom.js lib/evm.js lib/sha3.js \
                       lib/TCKT.js lib/ethereum.js

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
                     build/al/imeceİptal/paste.svg.inl \
                     build/incele/sayfa-%.keymap \
                     build/incele/sayfa.keymap \
                     build/ana/sayfa-%.keymap \
                     build/font/fonts-%.keymap \
                     build/birim/cüzdan/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
