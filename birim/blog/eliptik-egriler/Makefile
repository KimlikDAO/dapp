build/birim/blog/eliptik-egriler/banner.webp: birim/blog/eliptik-egriler/banner.webp
	mkdir -p $(dir $@)
	cp $^ $@

build/birim/blog/eliptik-egriler/birim.keymap: build/birim/blog/eliptik-egriler/banner.webp \
    build/birim/paralar/DOBBY.png
	mkdir -p $(dir $@) && > $@
	node lib/birimler/hasher $@ $^

birim/blog/eliptik-egriler.birim: build/birim/blog/eliptik-egriler/birim.keymap
