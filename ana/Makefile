build/ana/sayfa.js: ana/sayfa.js ana/sergi/birim.js \
                    birim/cüzdan/birim.js birim/telefon/birim.js \
                    lib/dom.js \
                    lib/ethereum.js
	mkdir -p build/ana
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/ana/sayfa.css: build/font/lato.css ana/sayfa.css \
                     birim/cüzdan/birim.css \
                     birim/telefon/birim.css
	mkdir -p build/ana
	cat $^ | yarn csso --output $@

ASSETS = build/ana/sayfa.js build/ana/sayfa.css
build/ana/sayfa.keymap: $(call compressions, $(ASSETS))
	rm -rf $@ && mkdir -p $(dir $@)
	tools/keyhasher.py $@ $(ASSETS)

build/ana.html: ana/sayfa.html build/ana/sayfa.keymap ana/sayfa.inlines \
                build/ana/ok.svg.inl \
                birim/telefon/birim.html \
                build/birim/cüzdan/birim.html
	cp $< $@
	tools/keymapper.py $@ build/ana/sayfa.keymap ana/sayfa.inlines
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
