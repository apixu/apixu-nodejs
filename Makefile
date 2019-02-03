.PHONY: env run test

ifndef NODEVERSION
NODEVERSION=11
endif

ifndef APIXUKEY
$(error APIXUKEY is not set)
endif

IMAGE=node:$(NODEVERSION)-alpine

env:
	docker run --rm -ti -v $(CURDIR):/src -w /src -e APIXUKEY=$(APIXUKEY) $(IMAGE) sh

run:
	docker run --rm -ti -v $(CURDIR):/src -w /src -e APIXUKEY=$(APIXUKEY) $(IMAGE) node $(FILE)

test:
	docker run --rm -ti -v $(CURDIR):/src -w /src -e APIXUKEY=$(APIXUKEY) $(IMAGE) sh -c 'if [ -z "`npm list | grep chai`" ]; then npm install; fi; npm test'
