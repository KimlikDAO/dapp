AĞLAR_SVGS := $(basename $(notdir $(wildcard birim/ağlar/*.svg)))
AĞLAR_REQUEST_SVGS := $(addsuffix .svg,$(addprefix build/birim/ağlar/, $(AĞLAR_SVGS)))
AĞLAR_INLINE_SVGS := $(addsuffix .isvg,$(addprefix build/birim/ağlar/, $(AĞLAR_SVGS)))

build/birim/ağlar/birim.keymap:  $(call compressions, $(AĞLAR_REQUEST_SVGS))
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ $(AĞLAR_REQUEST_SVGS)

birim/ağlar.birim: build/birim/ağlar/birim.keymap $(AĞLAR_INLINE_SVGS)
