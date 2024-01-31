BIRIM_PARALAR_SVG_OUT := $(addprefix build/, $(wildcard birim/paralar/*.svg))

build/birim/paralar/DOBBY.webp: birim/paralar/DOBBY.png
	mkdir -p $(dir $@)
	cwebp -q 90 $< -o $@

build/birim/paralar/birim.keymap: $(call compressions, $(BIRIM_PARALAR_SVG_OUT)) \
    build/birim/paralar/DOBBY.webp \
		build/birim/paralar/MINA.webp
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ $(BIRIM_PARALAR_SVG_OUT) \
	                 build/birim/paralar/DOBBY.webp \
	                 build/birim/paralar/MINA.webp
	sed -i.bak 's#.webp#.png#' $@

birim/paralar.birim: build/birim/paralar/birim.keymap
