build/birim/blog/2023.12/banner.webp: birim/blog/2023.12/banner.png
	mkdir -p $(dir $@)
	cwebp -m 6 -pass 10 -q 80 $< -o $@

build/birim/blog/2023.12/birim.keymap: build/birim/blog/2023.12/banner.webp
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ $<
	sed -i.bak 's#banner.webp#banner.png#' $@

birim/blog/2023.12.birim: birim/blog/2023.12/birim.html \
    build/birim/blog/2023.12/birim.keymap
