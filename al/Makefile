build/al-page: build/al build/al.gz build/al.br

build/al.keymap:
	touch build/al.keymap

build/al: build/al.keymap
	cp al/page.html build/al.tmp
	# keymapper build/al.keymap build/al.tmp 
	html-minifier -c tools/html-minifier.conf build/al.tmp > build/al
	rm build/al.tmp
