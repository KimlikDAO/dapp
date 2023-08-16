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

FontFaces := f400 f700

fonts = $(addprefix build/birim/font/,$(addsuffix -$(1).$(2), $(FontFaces)))

build/birim/font/lato-%.css: birim/font/lato.css build/birim/font/fonts-%.keymap
	mkdir -p $(dir $@)
	tools/keymapper.py $^ -o $@

build/birim/font/fonts-%.keymap: $(call compressions, $(call fonts,%,ttf)) \
                           $(call fonts,%,woff2)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ $(call fonts,$*,ttf)
	tools/keyhasher.py $@ --nocompress $(call fonts,$*,woff2)

build/birim/font/%.ttf: birim/font/%.txt
	mkdir -p $(dir $@)
	pyftsubset $(SourceDir)/$($(call removeLang,$*)Source) \
           $(PyftsubsetParams) \
           --text-file=$< \
           --output-file=$@

build/birim/font/%.woff2: build/birim/font/%.ttf birim/font/Makefile
	woff2_compress $<

.PRECIOUS: build/birim/font/%.woff2
