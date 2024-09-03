iptal-en := revoke
iptal-tr := iptal

build/iptal/sayfa-%.js: iptal/sayfa.js \
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
	bun lib/kdjs/kdjs.js $< -o $@ --define \
	    "TR\$$\$$module\$$lib\$$util\$$dom=$(Lang-$*)" \
	    "KonumTR\$$\$$module\$$birim\$$dil\$$birim=$(iptal-tr)" \
	    "KonumEN\$$\$$module\$$birim\$$dil\$$birim=$(iptal-en)"

build/iptal/sayfa.css: iptal/sayfa.css
	mkdir -p $(dir $@)
	cat $^ | bun csso --output $@

build/iptal/sayfa.keymap: $(call compressions, build/iptal/sayfa.css)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/iptal/sayfa.css

build/iptal/sayfa-%.keymap: build/ana/sayfa-%.keymap \
    $(call compressions, build/iptal/sayfa-%.js)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/iptal/sayfa-$*.js
	cat $< >> $@

build/iptal.html: iptal/sayfa.html \
    build/iptal/sayfa-tr.keymap \
    build/iptal/sayfa.keymap \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-tr.birim
	bun lib/birimler/işleyici.js $< tr

build/revoke.html: iptal/sayfa.html \
    build/iptal/sayfa-en.keymap \
    build/iptal/sayfa.keymap \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-en.birim
	bun lib/birimler/işleyici.js $< en

iptal.sayfa: $(call compressions,build/iptal.html build/revoke.html)
