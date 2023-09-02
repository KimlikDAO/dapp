build/birim/tckt/birim.keymap: $(call compressions, build/birim/tckt/görsel.svg)
	mkdir -p $(dir $@) && > $@
	tools/keyhasher.py $@ build/birim/tckt/görsel.svg

build/birim/tckt/logo.svg.inl: birim/tckt/logo.svg.inl
	mkdir -p $(dir $@)
	cp $^ $@

birim/tckt.birim: birim/tckt/birim.html \
    build/birim/tckt/logo.svg.inl
