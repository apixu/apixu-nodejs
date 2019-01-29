.PHONY: env

ifndef NODEVERSION
NODEVERSION=11
endif

env:
	docker run --rm -ti -v $(CURDIR):/src -w /src node:$(NODEVERSION)-alpine sh
