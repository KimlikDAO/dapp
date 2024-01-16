BIRIM_PARALAR_SVG_OUT := $(addprefix build/, $(wildcard birim/paralar/*.svg))

build/birim/paralar/DOBBY.webp: birim/paralar/DOBBY.png
	mkdir -p $(dir $@)
	cwebp -q 90 $< -o $@

build/birim/paralar/birim.keymap: build/birim/paralar/DOBBY.webp \
    $(call compressions, $(BIRIM_PARALAR_SVG_OUT))
	mkdir -p $(dir $@)
	node lib/birimler/hasher $@ $(BIRIM_PARALAR_SVG_OUT) $<
	sed -i.bak 's#.webp#.png#' $@

birim/paralar.birim: build/birim/paralar/birim.keymap
