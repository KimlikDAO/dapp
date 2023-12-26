build/birim/blog/eliptik-egriler/banner.webp: birim/blog/eliptik-egriler/banner.webp
	mkdir -p $(dir $@)
	cp $^ $@

build/birim/blog/eliptik-egriler/birim.keymap: build/birim/blog/eliptik-egriler/banner.webp \
    build/birim/paralar/DOBBY.webp
	mkdir -p $(dir $@) && > $@
	node lib/birimler/hasher $@ $^
	sed -i.bak 's#DOBBY.webp#DOBBY.png#' $@

birim/blog/eliptik-egriler.birim: birim/blog/eliptik-egriler/birim.html \
    build/birim/blog/eliptik-egriler/birim.keymap
