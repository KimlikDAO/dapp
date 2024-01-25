AL_TANIŞMA_INLINE_SVG := external-link.svg

AL_TANIŞMA_INLINE_SVG_OUT := $(foreach item,$(AL_TANIŞMA_INLINE_SVG),build/al/tanışma/$(basename $(item)).isvg)

AL_TANIŞMA_REQUEST_SVG := $(filter-out $(AL_TANIŞMA_INLINE_SVG), $(notdir $(wildcard al/tanışma/*.svg)))

AL_TANIŞMA_REQUEST_SVG_OUT := $(addprefix build/al/tanışma/, $(AL_TANIŞMA_REQUEST_SVG))

build/al/tanışma/birim.keymap: $(call compressions, $(AL_TANIŞMA_REQUEST_SVG_OUT) build/al/tanışma/powWorker.js)
	mkdir -p $(dir $@)
	bun lib/birimler/hasher.js $@ $(AL_TANIŞMA_REQUEST_SVG_OUT) build/al/tanışma/powWorker.js

al/tanışma.birim: al/tanışma/birim.html $(AL_TANIŞMA_INLINE_SVG_OUT) \
    build/al/tanışma/birim.keymap

build/al/tanışma/powWorker.js: al/tanışma/powWorker.js \
    al/tanışma/powWorker.d.js lib/util/worker.d.js \
    lib/crypto/sha3.js \
    lib/util/çevir.js
	mkdir -p $(dir $@)
	bun google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                            --jscomp_error=unusedLocalVariables \
                            --jscomp_error=strictCheckTypes \
                            --language_in ECMASCRIPT_NEXT \
                            --rewrite_polyfills=false \
                            --emit_use_strict \
                            --module_resolution NODE \
                            --assume_function_wrapper \
                            --dependency_mode PRUNE \
                            --entry_point $< \
                            --js $^ \
                            --js_output_file $@
	bun uglifyjs $@ -m -c toplevel,unsafe -o $@
	wc $@
