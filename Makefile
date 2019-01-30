.PHONY: env run

ifndef NODEVERSION
NODEVERSION=11
endif

ifndef APIXUKEY
$(error APIXUKEY is not set)
endif

env:
	docker run --rm -ti -v $(CURDIR):/src -w /src -e APIXUKEY=$(APIXUKEY) node:$(NODEVERSION)-alpine sh

run:
	docker run --rm -ti -v $(CURDIR):/src -w /src -e APIXUKEY=$(APIXUKEY) node:$(NODEVERSION)-alpine node $(FILE)
