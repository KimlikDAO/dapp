SourceDir = font/Lato2OFL
PyftsubsetParams = --no-recommended-glyphs \
                   --no-hinting \
                   --canonical-order \
                   --recalc-bounds

sfnt2woff = font/sfnt2woff-zopfli/sfnt2woff-zopfli

f400Source = Lato-Regular.ttf
f500Source = Lato-Medium.ttf
f600Source = Lato-SemiBold.ttf
f700Source = Lato-Black.ttf

FontFaces = f400 f700
TtfFonts = $(addsuffix .ttf,$(addprefix build/font/,$(FontFaces)))
WoffFonts = $(TtfFonts:.ttf=.woff)
Woff2Fonts = $(WoffFonts:=2)

$(sfnt2woff):
	make -C $(dir $@)

build/font/%.ttf:
	mkdir -p build/font
	pyftsubset $(SourceDir)/$($(basename $(notdir $@))Source) \
           $(PyftsubsetParams) \
           --text-file=font/$(basename $(notdir $@)).txt \
           --output-file=$@

build/font/%.woff: build/font/%.ttf $(sfnt2woff) font/Makefile
	$(sfnt2woff) -n 20 $<

build/font/%.woff2: build/font/%.ttf font/Makefile
	woff2_compress $<
