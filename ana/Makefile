build/ana/sayfa-%.js: ana/sayfa.js \
                      ana/sergi/birim.js \
                      birim/cüzdan/birim.js \
                      birim/telefon/birim.js \
                      birim/tckt/birim.js \
                      lib/dom.js \
                      lib/ethereum.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define TR=$(Lang-$*) \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@
	node tools/jsPostprocessor $@

build/ana/sayfa-%.css: build/font/lato-%.css ana/sayfa.css \
                       ana/sergi/birim.css \
                       birim/cüzdan/birim.css \
                       birim/telefon/birim.css \
                       birim/tckt/birim.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

build/ana/sayfa-%.keymap: $(call compressions, build/ana/sayfa-%.js build/ana/sayfa-%.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/ana/sayfa-$*.js build/ana/sayfa-$*.css

build/ana-%.html: ana/sayfa.html \
                  ana/sergi/birim.html \
                  birim/telefon/birim.html \
                  birim/cüzdan.birim \
                  build/ana/ok.svg.inl \
                  build/ana/discord.svg.inl \
                  build/ana/sayfa-%.keymap \
                  build/font/fonts-%.keymap \
                  build/birim/cüzdan/birim.keymap \
                  build/birim/tckt/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
