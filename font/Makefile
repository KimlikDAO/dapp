SourceDir = font/Lato2OFL
PyftsubsetParams = --no-recommended-glyphs \
                   --no-hinting \
                   --with-zopfli \
                   --canonical-order \
                   --recalc-bounds

f400Source = Lato-Regular.ttf
f500Source = Lato-Medium.ttf
f600Source = Lato-SemiBold.ttf
f700Source = Lato-Bold.ttf
f800Source = Lato-Heavy.ttf

FontFaces = f400 f700 f800
TtfFonts = $(addsuffix .ttf,$(addprefix build/font/,$(FontFaces)))
Woff2Fonts = $(TtfFonts:ttf=woff2)

build/font/lato.css: font/lato.css build/font/fonts.keymap
	mkdir -p build/font && cp $< $@
	tools/keymapper.py $@ build/font/fonts.keymap

build/font/fonts.keymap: $(call compressions, $(TtfFonts)) \
                         $(Woff2Fonts)
	rm -rf $@
	tools/keyhasher.py $@ $(TtfFonts)
	tools/keyhasher.py $@ --nocompress $(Woff2Fonts)

build/font/%.ttf: font/%.txt
	mkdir -p build/font
	pyftsubset $(SourceDir)/$($(basename $(notdir $@))Source) \
           $(PyftsubsetParams) \
           --text-file=$< \
           --output-file=$@

build/font/%.woff2: build/font/%.ttf font/Makefile
	woff2_compress $<
