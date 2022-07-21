build/ana/page.js: ana/page.js
	mkdir -p build/ana
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@

build/ana/page.css: ana/page.css
	mkdir -p build/ana
	cat $^ | yarn csso --output $@

build/ana/page.keymap: $(call compressions, build/ana/page.js) \
	                   $(call compressions, build/ana/page.css)
	rm -rf $@
	tools/keyhasher.py $@ build/ana/page.js build/ana/page.css

build/ana.html: ana/page.html build/ana/page.keymap ana/page.inlines ana/tr.svg
	cp $< $@
	tools/keymapper.py $@ build/ana/page.keymap ana/page.inlines
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
