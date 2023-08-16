SourceDir := birim/font/Lato2OFL
PyftsubsetParams := --no-recommended-glyphs \
                    --no-hinting \
                    --with-zopfli \
                    --canonical-order \
                    --recalc-bounds

f400Source := Lato-Regular.ttf
f500Source := Lato-Medium.ttf
f600Source := Lato-SemiBold.ttf
f700Source := Lato-Bold.ttf
f800Source := Lato-Heavy.ttf

LocalizedFonts := f700
GlobalFonts := f400

localizedFonts = $(addprefix build/birim/font/,$(addsuffix -$(1).$(2), $(LocalizedFonts)))
globalFonts = $(addprefix build/birim/font/,$(addsuffix .$(1), $(GlobalFonts)))

build/birim/font/lato-%.css: birim/font/lato.css \
    build/birim/font/fonts-%.keymap \
    build/birim/font/fonts.keymap
	mkdir -p $(dir $@)
	tools/keymapper.py $^ -o $@

build/birim/font/fonts.keymap: \
	$(call compressions, $(call globalFonts,ttf)) \
    $(call globalFonts,woff2)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ $(call globalFonts,ttf)
	tools/keyhasher.py $@ --nocompress $(call globalFonts,woff2)

build/birim/font/fonts-%.keymap: \
    $(call compressions, $(call localizedFonts,%,ttf)) \
    $(call localizedFonts,%,woff2)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ $(call localizedFonts,$*,ttf)
	tools/keyhasher.py $@ --nocompress $(call localizedFonts,$*,woff2)

build/birim/font/%.ttf: birim/font/%.txt
	mkdir -p $(dir $@)
	pyftsubset $(SourceDir)/$($(call removeLang,$*)Source) \
           $(PyftsubsetParams) \
           --text-file=$< \
           --output-file=$@

build/birim/font/%.woff2: build/birim/font/%.ttf birim/font/Makefile
	woff2_compress $<

.PRECIOUS: build/birim/font/%.woff2
