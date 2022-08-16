JsDeps_oyla/sayfa := oyla/sayfa.js \
                     birim/cüzdan/birim.js \
                     lib/dom.js lib/ethereum.js lib/TCKT.js

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
