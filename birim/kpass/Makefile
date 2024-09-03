BIRIM_KPASS_ASSETS := build/TCKT.svg build/TCKT.png build/TCKT.webp \
  build/KPASS.svg build/KPASS.png build/KPASS.webp

build/birim/kpass/birim.keymap: $(call compressions, build/TCKT.svg) \
    $(call compressions, build/KPASS.svg)
	mkdir -p $(dir $@)
	echo "/birim/kpass/kapak.m.svg -> KPASS.svg" > $@

build/TCKT.svg: build/birim/kpass/kapak.m.svg
	mkdir -p $(dir $@)
	cp $^ $@

build/TCKT.png: build/TCKT.svg
	mkdir -p $(dir $@)
	rsvg-convert -w 400 -h 400 -o $@ $^
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
