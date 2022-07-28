build/ana/sayfa.js: ana/sayfa.js
	mkdir -p build/ana
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/ana/sayfa.css: build/font/lato.css ana/sayfa.css
	mkdir -p build/ana
	cat $^ | yarn csso --output $@

build/ana/sayfa.keymap: $(call compressions, build/ana/sayfa.js) \
                        $(call compressions, build/ana/sayfa.css)
	rm -rf $@
	tools/keyhasher.py $@ build/ana/sayfa.js build/ana/sayfa.css

build/ana.html: ana/sayfa.html build/ana/sayfa.keymap ana/sayfa.inlines
	cp $< $@
	tools/keymapper.py $@ build/ana/sayfa.keymap ana/sayfa.inlines
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
