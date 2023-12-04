build/birim/tckt/birim.keymap: $(call compressions, build/TCKT.svg)
	mkdir -p $(dir $@)
	echo "/birim/tckt/kapak.svg -> TCKT.svg" > $@

build/TCKT.svg: build/birim/tckt/kapak.svg
	mkdir -p $(dir $@)
	cp $^ $@

birim/tckt.birim: birim/tckt/birim.html build/birim/tckt/birim.keymap
