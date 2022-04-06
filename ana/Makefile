build/ana.keymap:
	touch build/ana.keymap

build/ana-page: build/ana build/ana.gz build/ana.br

build/ana: build/ana.keymap
	cp ana/page.html build/ana.tmp
	html-minifier -c htmlminifier.conf build/ana.tmp > build/ana
	rm build/ana.tmp
