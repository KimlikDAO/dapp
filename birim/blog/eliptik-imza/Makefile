build/birim/blog/eliptik-imza/banner.keymap:
	mkdir -p $(dir $@)
	echo "/birim/kpass/kapak.m.svg -> //kimlikdao.org/KPASS.svg" > $@

build/birim/blog/eliptik-imza/birim.keymap: build/birim/blog/eliptik-imza/banner.keymap
	cp $< $@

birim/blog/eliptik-imza.birim: build/birim/paralar/USDT.isvg \
    build/birim/blog/eliptik-imza/birim.keymap \
		build/birim/blog/eliptik-imza/banner.isvg
