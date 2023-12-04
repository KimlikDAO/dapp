
DİL_REQUEST_SVG := $(notdir $(wildcard birim/dil/*.svg))

DİL_REQUEST_SVG_OUT := $(addprefix build/birim/dil/, $(DİL_REQUEST_SVG))

build/birim/dil/birim.keymap: $(call compressions, $(DİL_REQUEST_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	node lib/birimler/hasher $@ $(DİL_REQUEST_SVG_OUT)

birim/dil.birim: birim/dil/birim.html \
    build/birim/dil/birim.keymap
