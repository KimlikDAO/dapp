BIRIM_TCKT_ASSETS := build/TCKT.svg build/TCKT.png build/TCKT.webp

build/birim/tckt/birim.keymap: $(call compressions, build/TCKT.svg)
	mkdir -p $(dir $@)
	echo "/birim/tckt/kapak.svg -> TCKT.svg" > $@

build/TCKT.svg: build/birim/tckt/kapak.svg
	mkdir -p $(dir $@)
	cp $^ $@

build/TCKT.png: build/TCKT.svg
	mkdir -p $(dir $@)
	bun svgexport $^ $@ 400:400
	pngcrush -brute -ow $@

build/TCKT.webp: build/TCKT.png
	mkdir -p $(dir $@)
	cwebp -m 6 -pass 10 -q 80 $^ -o $@

birim/tckt.birim: birim/tckt/birim.html \
    build/birim/tckt/birim.keymap \
    $(BIRIM_TCKT_ASSETS)
