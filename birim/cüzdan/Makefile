CÜZDAN_INLINE_SVG := arbitrumone.svg ambassador.svg external-link.svg iptal.svg

CÜZDAN_INLINE_SVG_OUT := $(foreach item,$(CÜZDAN_INLINE_SVG),build/birim/cüzdan/img/$(item).inl)

CÜZDAN_REQUEST_SVG := $(filter-out $(CÜZDAN_INLINE_SVG), $(notdir $(wildcard birim/cüzdan/img/*.svg)))

CÜZDAN_REQUEST_SVG_OUT := $(addprefix build/birim/cüzdan/img/, $(CÜZDAN_REQUEST_SVG))

build/birim/cüzdan/birim.keymap: $(call compressions, $(CÜZDAN_REQUEST_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	node lib/birimler/hasher $@ $(CÜZDAN_REQUEST_SVG_OUT)

birim/cüzdan.birim: birim/cüzdan/birim.html \
    $(CÜZDAN_INLINE_SVG_OUT) \
    build/birim/paste.svg.inl
