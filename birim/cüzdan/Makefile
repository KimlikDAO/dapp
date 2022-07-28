INLINE_SVG := avalanche.svg \
              copy.svg external-link.svg debank.svg \
              en.svg tr.svg

INLINE_SVG_OUT := $(foreach item,$(INLINE_SVG),build/birim/cüzdan/img/$(item).inl)

REQUEST_SVG := $(filter-out $(INLINE_SVG), $(notdir $(wildcard birim/cüzdan/img/*.svg)))

REQUEST_SVG_OUT := $(addprefix build/birim/cüzdan/img/, $(REQUEST_SVG))

build/birim/cüzdan/birim.keymap: $(call compressions, $(REQUEST_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	tools/keyhasher.py $@ $(REQUEST_SVG_OUT)

build/birim/cüzdan/birim.inlines: $(INLINE_SVG_OUT)
	mkdir -p $(dir $@)
	> $@
	$(foreach s, $^, echo "svg:/$(s:build/%.inl=%) -> $s" >> $@;)

build/birim/cüzdan/birim.html: birim/cüzdan/birim.html \
                               build/birim/cüzdan/birim.keymap \
                               build/birim/cüzdan/birim.inlines
	mkdir -p $(dir $@) && cp $< $@
	tools/keymapper.py $@ $(filter-out $<,$^)
