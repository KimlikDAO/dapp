
build/birim/favicon/icon.png: build/birim/favicon/icon.svg
	mkdir -p $(dir $@)
	yarn svgexport $^ $@.tmp 32:32
	pngcrush -brute $@.tmp $@ 

build/birim/favicon/birim.keymap: $(call compressions, build/birim/favicon/icon.svg) \
  build/birim/favicon/icon.png
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/birim/favicon/icon.svg
	tools/keyhasher.py $@ --nocompress build/birim/favicon/icon.png

birim/favicon.birim: birim/favicon/birim.html
