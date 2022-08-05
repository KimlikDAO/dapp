SVG_OUT := $(addprefix build/, $(wildcard al/ödeme/*.svg))

build/al/ödeme/birim.keymap: $(call compressions, $(SVG_OUT))
	mkdir -p $(dir $@) && rm -rf $@
	tools/keyhasher.py $@ $(SVG_OUT)
