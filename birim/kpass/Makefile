BIRIM_KPASS_ASSETS := build/TCKT.svg build/TCKT.png build/TCKT.webp \
  build/KPASS.svg build/KPASS.png build/KPASS.webp

build/birim/kpass/birim.keymap: $(call compressions, build/TCKT.svg) \
    $(call compressions, build/KPASS.svg)
	mkdir -p $(dir $@)
	echo "/birim/kpass/kapak.svg -> TCKT.svg" > $@

build/TCKT.svg: build/birim/kpass/kapak.svg
	mkdir -p $(dir $@)
	cp $^ $@

build/TCKT.png: build/TCKT.svg
	mkdir -p $(dir $@)
	bun svgexport $^ $@ 400:400
	pngcrush -brute -ow $@

build/TCKT.webp: build/TCKT.png
	mkdir -p $(dir $@)
	cwebp -m 6 -pass 10 -q 80 $^ -o $@

build/KPASS.%: build/TCKT.%
	cp -f $^ $@

birim/kpass.birim: birim/kpass/birim.html \
    birim/kpass/üret/*.js \
    build/birim/kpass/birim.keymap \
    $(BIRIM_KPASS_ASSETS)
