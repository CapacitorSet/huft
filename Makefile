all: huft.xpi docs/lib.es5.min.js

huft.xpi: index.es5.js
	jpm xpi

browser: docs/lib.es5.min.js

index.es5.js: index.js
	node node_modules/.bin/babel --presets es2015 index.js -o index.es5.js

docs/lib.es5.js: docs/lib.js
	node node_modules/.bin/babel --presets es2015 docs/lib.js -o docs/lib.es5.js

docs/lib.es5.min.js: docs/lib.es5.js
	node node_modules/.bin/uglifyjs docs/lib.es5.js -o docs/lib.es5.min.js