
DİL_REQUEST_SVG := $(notdir $(wildcard birim/dil/*.svg))

DİL_REQUEST_SVG_OUT := $(addprefix build/birim/dil/, $(DİL_REQUEST_SVG))

build/birim/dil/birim.keymap: $(call compressions, $(DİL_REQUEST_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	tools/keyhasher.py $@ $(DİL_REQUEST_SVG_OUT)
