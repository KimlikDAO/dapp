MAKEFLAGS := -j 8

all: build

include lib/birimler/Makefile
include al/Makefile
include ana/Makefile
include birim/Makefile
include incele/Makefile
include iptal/Makefile
include oyla/Makefile
include sunucu/Makefile

clean:
	rm -rf build

.PHONY: clean
