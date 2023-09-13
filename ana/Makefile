build/ana/sayfa-%.js: ana/sayfa.js \
                      ana/liste/birim.js \
                      birim/cüzdan/*.js \
                      birim/dil/birim.js \
                      birim/telefon/birim.js \
                      birim/tckt/birim.js \
                      lib/crosschain/unlockable.d.js \
                      lib/crosschain/provider.js lib/crosschain/signer.js \
                      lib/did/*.d.js \
                      lib/ethereum/*.d.js lib/ethereum/TCKTLite.js \
                      lib/node/*.d.js lib/node/ipfs.js \
                      lib/util/dom.js lib/util/çevir.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --define "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -c toplevel,unsafe -o $@

build/ana/sayfa-%.css: \
    build/birim/lato/l400.css \
    build/birim/lato/l700-%.css \
    ana/sayfa.css \
    ana/liste/birim.css \
    birim/ortak.css \
    birim/başlık/birim.css \
    birim/cüzdan/birim.css \
    birim/dil/birim.css \
    birim/telefon/birim.css \
    birim/tckt/birim.css
	mkdir -p $(dir $@)
	cat $^ | yarn csso --output $@

# In dapp, we bundle ana/sayfa.css and birim/ortak.css together since both are tiny.
# In the html call site always pretend no bundling happens and in the Makefile
# callsite depend on build/ana/sayfa-%.keymap
build/ana/sayfa-%.keymap: $(call compressions, build/ana/sayfa-%.js build/ana/sayfa-%.css)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/ana/sayfa-$*.js build/ana/sayfa-$*.css
	sed -i.bak 's#/ana/sayfa.css#/birim/ortak.css#' $@

build/ana-%.html: ana/sayfa.html \
                  ana/liste/birim.html \
                  birim/başlık.birim \
                  birim/favicon.birim \
                  birim/lato.birim \
                  birim/tckt.birim \
                  birim/telefon.birim \
                  build/ana/ok.svg.inl \
                  build/ana/sayfa-%.keymap \
                  build/birim/cüzdan/birim.keymap \
                  build/birim/dil/birim.keymap \
                  build/birim/favicon/birim.keymap \
                  build/birim/lato/l400.keymap \
                  build/birim/lato/l700-%.keymap \
                  build/birim/tckt/birim.keymap
	node tools/htmlProcessor $< $*
	tools/keymapper.py $@ $(filter %.keymap,$^)
	yarn html-minifier -c tools/html-minifier.conf $@ -o $@
