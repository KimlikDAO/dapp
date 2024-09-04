build/oyla.html: oyla/sayfa.html \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-tr.birim \
    build/oyla/dropdownok.isvg
	bun lib/birimler/işleyici.js $< tr

build/vote.html: oyla/sayfa.html \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/lato-en.birim \
    build/oyla/dropdownok.isvg
	bun lib/birimler/işleyici.js $< en

oyla.sayfa: $(call compressions,build/oyla.html build/vote.html)
