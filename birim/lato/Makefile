SourceDir := birim/lato/Lato2OFL
PyftsubsetParams := --no-recommended-glyphs \
                    --no-hinting \
                    --with-zopfli \
                    --canonical-order \
                    --recalc-bounds

l400Source := Lato-Regular.ttf
l500Source := Lato-Medium.ttf
l600Source := Lato-SemiBold.ttf
l700Source := Lato-Bold.ttf
l800Source := Lato-Heavy.ttf

l700Files = $(addprefix build/birim/lato/,$(addsuffix -$(1).$(2), l700))
l400Files = $(addprefix build/birim/lato/,$(addsuffix .$(1), l400))

build/birim/lato/l400.css: birim/lato/l400.css \
    build/birim/lato/birim.keymap
	mkdir -p $(dir $@)
	lib/birimler/keymapper.py $^ -o $@

build/birim/lato/l700-%.css: birim/lato/l700.css \
    build/birim/lato/birim-%.keymap
	mkdir -p $(dir $@)
	lib/birimler/keymapper.py $^ -o $@

build/birim/lato/birim.keymap: \
    $(call compressions, $(call l400Files,ttf)) \
    $(call l400Files,woff2)
	mkdir -p $(dir $@)
	node lib/birimler/hasher $@ $(call l400Files,ttf) $(call l400Files,woff2)

build/birim/lato/birim-%.keymap: \
    $(call compressions, $(call l700Files,%,ttf)) \
    $(call l700Files,%,woff2)
	mkdir -p $(dir $@)
	node lib/birimler/hasher $@ $(call l700Files,$*,ttf) $(call l700Files,$*,woff2)

build/birim/lato/%.ttf: birim/lato/%.txt
	mkdir -p $(dir $@)
	pyftsubset $(SourceDir)/$($(call removeLang,$*)Source) \
           $(PyftsubsetParams) \
           --text-file=$< \
           --output-file=$@

build/birim/lato/%.woff2: build/birim/lato/%.ttf birim/lato/Makefile
	woff2_compress $<

birim/lato-en.birim: birim/lato/birim.html \
    build/birim/lato/birim-en.keymap \
	  build/birim/lato/birim.keymap

birim/lato-tr.birim: birim/lato/birim.html \
    build/birim/lato/birim-tr.keymap \
	  build/birim/lato/birim.keymap

.PRECIOUS: build/birim/lato/%.woff2
