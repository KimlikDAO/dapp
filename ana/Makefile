build/ana-page: build/ana build/ana.gz build/ana.br

build/ana.keymap:
	touch build/ana.keymap

build/ana: build/ana.keymap
	cp ana/page.html build/ana.tmp
	# keymapper build/ana.keymap build/ana.tmp 
	html-minifier -c tools/html-minifier.conf build/ana.tmp > build/ana
	rm build/ana.tmp
