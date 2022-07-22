FontSource = font/Lato2OFL
PyftsubsetParams = --no-recommended-glyphs \
                   --no-hinting \
                   --canonical-order \
                   --recalc-bounds

sfnt2woff = font/sfnt2woff-zopfli/sfnt2woff-zopfli

FontFaces = lt400
TtfFonts = $(addprefix build/font/, $(FontFaces))
WoffFonts = $(TtfFonts:.ttf=.woff)
Woff2Fonts = $(WoffFonts:=2)

$(sfnt2woff):
	make -C $(dir $@)

build/font/lt400.ttf: $(FontSource)/Lato-Regular.ttf font/Makefile
	mkdir -p build/font
	pyftsubset $< $(PyftsubsetParams) \
           --text-file=font/specimen400.txt \
           --output-file=$@

build/font/%.woff: build/font/%.ttf $(sfnt2woff) font/Makefile
	$(sfnt2woff) -n 20 $<

build/font/%.woff2: font/%.ttf
	woff2_compress $<
