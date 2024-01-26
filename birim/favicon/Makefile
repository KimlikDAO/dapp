build/birim/favicon/icon16.png: build/birim/favicon/icon.svg
	mkdir -p $(dir $@)
	bun svgexport $^ $@.tmp 16:16
	pngcrush -brute $@.tmp $@

build/birim/favicon/icon32.png: build/birim/favicon/icon.svg
	mkdir -p $(dir $@)
	bun svgexport $^ $@.tmp 32:32
	pngcrush -brute $@.tmp $@

build/favicon.ico: \
  build/birim/favicon/icon16.png \
  build/birim/favicon/icon32.png \
  build/birim/favicon/icon64.png
	convert -background transparent $^ $@

build/birim/favicon/birim.keymap: $(call compressions, build/birim/favicon/icon.svg) \
	build/birim/favicon/icon32.png
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ build/birim/favicon/icon.svg build/birim/favicon/icon32.png

birim/favicon.birim: birim/favicon/birim.html \
    build/birim/favicon/birim.keymap
