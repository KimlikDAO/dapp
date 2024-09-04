build/iptal.html: iptal/sayfa.html \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-tr.birim
	bun lib/birimler/işleyici.js $< tr

build/revoke.html: iptal/sayfa.html \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-en.birim
	bun lib/birimler/işleyici.js $< en

iptal.sayfa: $(call compressions,build/iptal.html build/revoke.html)
