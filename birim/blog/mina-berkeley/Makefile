build/birim/blog/mina-berkeley/banner.webp: birim/blog/mina-berkeley/banner.png
	mkdir -p $(dir $@)
	cwebp -m 6 -pass 10 -q 80 $< -o $@

build/birim/blog/mina-berkeley/birim.keymap: build/birim/blog/mina-berkeley/banner.webp \
    build/birim/paralar/MINA.webp
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ $^
	sed -i.bak 's#banner.webp#banner.png#' $@
	sed -i.bak 's#MINA.webp#MINA.png#' $@

birim/blog/mina-berkeley.birim: birim/blog/mina-berkeley/birim.html \
    build/birim/blog/mina-berkeley/birim.keymap
