build/birim/blog/2024.01/banner.webp: birim/blog/2024.01/banner.png
	mkdir -p $(dir $@)
	cwebp -q 50 $< -o $@

build/birim/blog/2024.01/birim.keymap: build/birim/blog/2024.01/banner.webp
	mkdir -p $(dir $@) && rm -rf $@
	node lib/birimler/hasher $@ $<
	sed -i.bak 's#banner.webp#banner.png#' $@

birim/blog/2024.01.birim: birim/blog/2024.01/birim.html \
    build/birim/blog/2024.01/birim.keymap
