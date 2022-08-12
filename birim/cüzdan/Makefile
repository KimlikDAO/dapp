INLINE_SVG := avalanche.svg copy.svg external-link.svg

INLINE_SVG_OUT := $(foreach item,$(INLINE_SVG),build/birim/cüzdan/img/$(item).inl)

REQUEST_SVG := $(filter-out $(INLINE_SVG), $(notdir $(wildcard birim/cüzdan/img/*.svg)))

REQUEST_SVG_OUT := $(addprefix build/birim/cüzdan/img/, $(REQUEST_SVG))

build/birim/cüzdan/birim.keymap: $(call compressions, $(REQUEST_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	tools/keyhasher.py $@ $(REQUEST_SVG_OUT)

birim/cüzdan.birim: birim/cüzdan/birim.html $(INLINE_SVG_OUT)
