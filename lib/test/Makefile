build/lib/test/sha3.compiled-test.js: lib/test/sha3.compiled-test.js lib/test/*.js \
                                      lib/sha3.js lib/çevir.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --emit_use_strict \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -o $@
	node $@

lib/test.test: build/lib/test/sha3.compiled-test.js

.PHONY: lib/test.test
