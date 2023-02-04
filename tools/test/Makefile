build/test/prod.compiled-test.js: tools/test/prod.compiled-test.js \
    tools/prod.js tools/prod.d.js \
    lib/cloudflare/types.d.js lib/cloudflare/moduleWorker.d.js \
    lib/testing/assert.js lib/testing/nodejs.d.js
	mkdir -p $(dir $@)
	yarn google-closure-compiler -W VERBOSE -O ADVANCED --charset UTF-8 \
                             --jscomp_error=strictCheckTypes \
                             --jscomp_error=unusedLocalVariables \
                             --module_resolution NODE \
                             --assume_function_wrapper \
                             --dependency_mode PRUNE \
                             --entry_point $< \
                             --js $^ \
                             --js_output_file $@
	yarn uglifyjs $@ -m -c toplevel,unsafe -o $@
	node $@
	wc $@
