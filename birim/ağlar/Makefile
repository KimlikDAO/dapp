AĞLAR_SVGS := $(basename $(notdir $(wildcard birim/ağlar/*.svg)))
AĞLAR_REQUEST_SVGS := $(addsuffix .svg,$(addprefix build/birim/ağlar/, $(AĞLAR_SVGS)))
AĞLAR_INLINE_SVGS := $(addsuffix .isvg,$(addprefix build/birim/ağlar/, $(AĞLAR_SVGS)))

build/birim/ağlar/birim.keymap:  $(call compressions, $(AĞLAR_REQUEST_SVGS)) \
  build/birim/ağlar/mina.webp
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ $(AĞLAR_REQUEST_SVGS) build/birim/ağlar/mina.webp
	sed -i.bak 's#mina.webp#mina.png#' $@

birim/ağlar.birim: build/birim/ağlar/birim.keymap $(AĞLAR_INLINE_SVGS)
