build/birim/blog/eliptik-imza/banner.keymap:
	mkdir -p $(dir $@)
	echo "/birim/tckt/kapak.svg -> //kimlikdao.org/TCKT.svg" > $@

build/birim/blog/eliptik-imza/birim.keymap: build/birim/blog/eliptik-imza/banner.keymap
	cp $< $@

birim/blog/eliptik-imza.birim: build/birim/paralar/USDT.isvg \
    build/birim/blog/eliptik-imza/birim.keymap \
		build/birim/blog/eliptik-imza/banner.isvg
