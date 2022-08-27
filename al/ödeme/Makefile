AL_ÖDEME_SVG_OUT := $(addprefix build/, $(wildcard al/ödeme/*.svg))

build/al/ödeme/birim.keymap: $(call compressions, $(AL_ÖDEME_SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	tools/keyhasher.py $@ $(AL_ÖDEME_SVG_OUT)
