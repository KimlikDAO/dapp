SourceDir := font/Lato2OFL
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

FontFaces := f400 f700 f800

fonts = $(addprefix build/font/,$(addsuffix -$(1).$(2), $(FontFaces)))

build/font/lato-%.css: font/lato.css build/font/fonts-%.keymap
	mkdir -p $(dir $@)
	tools/keymapper.py $^ -o $@

.PRECIOUS: build/font/lato-%.css

build/font/fonts-%.keymap: $(call compressions, $(call fonts,%,ttf)) \
                           $(call fonts,%,woff2)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ $(call fonts,$*,ttf)
	tools/keyhasher.py $@ --nocompress $(call fonts,$*,woff2)

.PRECIOUS: build/font/fonts-%.keymap

build/font/%.ttf: font/%.txt
	mkdir -p $(dir $@)
	pyftsubset $(SourceDir)/$($(call removeLang, $*)Source) \
           $(PyftsubsetParams) \
           --text-file=$< \
           --output-file=$@

.PRECIOUS: build/font/%.ttf

build/font/%.woff2: build/font/%.ttf font/Makefile
	woff2_compress $<

.PRECIOUS: build/font/%.woff2
