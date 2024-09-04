include al/ödeme/Makefile
include al/tanışma/Makefile

build/al.html: al/sayfa.html \
               al/imeceİptal/birim.html \
               al/ödeme.birim \
               al/tanışma.birim \
               build/al/paste.isvg \
               build/al/tanışma/external-link.isvg \
               birim/başlık.birim \
               birim/favicon.birim \
               birim/kpass.birim \
               birim/lato-tr.birim \
               birim/telefon.birim
	bun lib/birimler/işleyici.js $< tr

build/mint.html: al/sayfa.html \
               al/imeceİptal/birim.html \
               al/ödeme.birim \
               al/tanışma.birim \
               build/al/paste.isvg \
               build/al/tanışma/external-link.isvg \
               birim/başlık.birim \
               birim/favicon.birim \
               birim/kpass.birim \
               birim/lato-tr.birim \
               birim/telefon.birim
	bun lib/birimler/işleyici.js $< en

al.sayfa: $(call compressions,build/al.html build/mint.html)
