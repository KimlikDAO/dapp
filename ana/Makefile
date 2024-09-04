include ana/ağ/Makefile
include ana/hero/Makefile
include ana/kazan/Makefile
include ana/raporlar/Makefile
include ana/sahipler/Makefile
include ana/sayılar/Makefile

build/en.html: ana/sayfa.html \
    ana/ağ.birim \
    ana/hero.birim \
    ana/kazan.birim \
    ana/raporlar.birim \
    ana/sahipler.birim \
    ana/sayılar.birim \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/kpass.birim \
    birim/lato-en.birim \
    birim/telefon.birim \
    build/ana/ok.isvg
	bun lib/birimler/işleyici.js $< en

build/tr.html: ana/sayfa.html \
    ana/ağ.birim \
    ana/hero.birim \
    ana/kazan.birim \
    ana/raporlar.birim \
    ana/sahipler.birim \
    ana/sayılar.birim \
    birim/başlık.birim \
    birim/favicon.birim \
    birim/kpass.birim \
    birim/lato-tr.birim \
    birim/telefon.birim \
    build/ana/ok.isvg
	bun lib/birimler/işleyici.js $< tr

ana.sayfa: $(call compressions,build/en.html build/tr.html)
