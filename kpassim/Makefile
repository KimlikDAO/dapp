build/kpassim.html: kpassim/sayfa.html \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-tr.birim \
    birim/kpass.birim \
    build/al/paste.isvg
	bun lib/birimler/işleyici.js $< tr

build/kpass.html: kpassim/sayfa.html \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-en.birim \
    birim/kpass.birim \
    build/al/paste.isvg
	bun lib/birimler/işleyici.js $< en

kpassim.sayfa: $(call compressions,build/kpassim.html build/kpass.html)
