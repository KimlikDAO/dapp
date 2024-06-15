oyla-en := vote
oyla-tr := oyla

build/oyla/sayfa-%.js: oyla/sayfa.js \
                       birim/ağlar/*.js \
                       birim/cüzdan/*.js \
                       birim/dil/birim.js \
                       lib/api/jsonrpc.d.js lib/api/jsonrpc.js \
                       lib/crosschain/*.js \
                       lib/crypto/sha3.js \
                       lib/crypto/secp256k1.js lib/crypto/modular.js \
                       lib/ethereum/*.d.js \
                       lib/ethereum/evm.js lib/ethereum/KPass.js \
                       lib/ethereum/provider.js lib/ethereum/KPassLite.js \
                       lib/mina/*.d.js \
                       lib/node/*.d.js lib/node/ipfs.js \
                       lib/util/dom.js lib/util/çevir.js lib/util/base58.js
	mkdir -p $(dir $@)
	bun lib/kdc/kdc.js $^ -o $@ --loose --define \
	    "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
	    "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(oyla-tr)" \
	    "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(oyla-en)"

build/oyla/sayfa.css: oyla/sayfa.css oyla/*/*.css
	mkdir -p $(dir $@)
	cat $^ | bun csso --output $@

build/oyla/sayfa.keymap: $(call compressions, build/oyla/sayfa.css)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/oyla/sayfa.css

build/oyla/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/oyla/sayfa-%.js)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/oyla/sayfa-$*.js
	cat $< >> $@

build/oyla-%.html: oyla/sayfa.html \
                   build/oyla/sayfa.keymap \
                   build/oyla/sayfa-%.keymap \
                   birim/başlık.birim \
                   birim/favicon.birim \
                   birim/lato-%.birim \
                   build/oyla/dropdownok.isvg
	bun lib/birimler/işleyici.js $< $*
