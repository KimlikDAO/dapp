include ana/ağ/Makefile
include ana/hero/Makefile
include ana/kazan/Makefile
include ana/raporlar/Makefile
include ana/sahipler/Makefile
include ana/sayılar/Makefile

ana-en := "?en"
ana-tr := "?tr"

build/ana/sayfa-%.js: ana/sayfa.js \
                      ana/hero/sergi/birim.js \
                      ana/kazan/birim.js \
                      birim/ağlar/*.js \
                      birim/altdizin/*.js \
                      birim/blog/mina-berkeley/*.js \
                      birim/cüzdan/*.js \
                      birim/dil/birim.js \
                      birim/kaydol/*.js \
                      birim/kpass/birim.js \
                      birim/telefon/birim.js \
                      lib/api/jsonrpc.d.js lib/api/jsonrpc.js \
                      lib/crosschain/*.js \
                      lib/did/*.d.js \
                      lib/ethereum/*.d.js \
                      lib/ethereum/provider.js lib/ethereum/KPassLite.js \
                      lib/mina/*.d.js \
                      lib/node/*.d.js lib/node/ipfs.js \
                      lib/util/dom.js lib/util/çevir.js lib/util/base58.js
	bun lib/kdjs/kdjs.js $< --define \
	    "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
	    "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(ana-tr)" \
	    "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(ana-en)" \
	    -o $@

build/ana/sayfa-%.css: \
    build/birim/lato/l400.css \
    build/birim/lato/l700-%.css \
    ana/sayfa.css \
    ana/ağ/birim.css \
    ana/hero/birim.css \
    ana/hero/sergi/birim.css \
    ana/kazan/birim.css \
    ana/sahipler/birim.css \
    ana/sayılar/birim.css \
    birim/altdizin/birim.css \
    birim/ortak.css \
    birim/başlık/birim.css \
    birim/blog/birim.css \
    birim/blog/eliptik-imza/birim.css \
    birim/blog/mina-berkeley/birim.css \
    birim/cüzdan/birim.css \
    birim/dil/birim.css \
    birim/kaydol/birim.css \
    birim/telefon/birim.css \
    birim/kpass/birim.css
	mkdir -p $(dir $@)
	cat $^ | bun csso --output $@

# In dapp, we bundle ana/sayfa.css and birim/ortak.css together since both are tiny.
# In the html call site always pretend no bundling happens and in the Makefile
# callsite depend on build/ana/sayfa-%.keymap
build/ana/sayfa-%.keymap: lib/birimler/hasher.js \
    $(call compressions, build/ana/sayfa-%.js build/ana/sayfa-%.css)
	mkdir -p $(dir $@)
	bun $< $@ build/ana/sayfa-$*.js build/ana/sayfa-$*.css
	sed -i.bak 's#/ana/sayfa.css#/birim/ortak.css#' $@

build/ana-%.html: ana/sayfa.html \
                  build/ana/sayfa-%.keymap \
                  ana/ağ.birim \
                  ana/hero.birim \
                  ana/kazan.birim \
                  ana/raporlar.birim \
                  ana/sahipler.birim \
                  ana/sayılar.birim \
                  birim/başlık.birim \
                  birim/favicon.birim \
                  birim/kpass.birim \
                  birim/lato-%.birim \
                  birim/telefon.birim \
                  build/ana/ok.isvg
	bun lib/birimler/işleyici.js $< $*
