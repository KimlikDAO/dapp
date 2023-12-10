BIRIM_PARALAR_SVG_OUT := $(addprefix build/, $(wildcard birim/paralar/*.svg))

build/birim/paralar/DOBBY.png: birim/paralar/DOBBY.png
	mkdir -p $(dir $@)
	pngcrush -brute $< $@

build/birim/paralar/birim.keymap: build/birim/paralar/DOBBY.png \
    $(call compressions, $(BIRIM_PARALAR_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	node lib/birimler/hasher $@ $(BIRIM_PARALAR_SVG_OUT) $<

birim/paralar.birim: build/birim/paralar/birim.keymap
