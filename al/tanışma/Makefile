AL_TANIŞMA_INLINE_SVG := external-link.svg

AL_TANIŞMA_INLINE_SVG_OUT := $(foreach item,$(AL_TANIŞMA_INLINE_SVG),build/al/tanışma/$(item).inl)

AL_TANIŞMA_REQUEST_SVG := $(filter-out $(AL_TANIŞMA_INLINE_SVG), $(notdir $(wildcard al/tanışma/*.svg)))

AL_TANIŞMA_REQUEST_SVG_OUT := $(addprefix build/al/tanışma/, $(AL_TANIŞMA_REQUEST_SVG))

build/al/tanışma/birim.keymap: $(call compressions, $(AL_TANIŞMA_REQUEST_SVG_OUT) build/al/tanışma/pow-worker.js)
	mkdir -p $(dir $@) && rm -rf $@
	tools/keyhasher.py $@ $(AL_TANIŞMA_REQUEST_SVG_OUT) build/al/tanışma/pow-worker.js

al/tanışma.birim: al/tanışma/birim.html $(AL_TANIŞMA_INLINE_SVG_OUT)

build/al/tanışma/pow-worker.js: al/tanışma/pow-worker.js lib/util/worker.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --language_in ECMASCRIPT_2021 \
                             --define POW_EŞİĞİ=$(POW_EŞİĞİ) \
                             --assume_function_wrapper \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@
