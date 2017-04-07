all: docs/index.html docs/lib.es5.min.js

docs/lib.es5.js: docs/lib.js
	node node_modules/.bin/babel --presets es2015 docs/lib.js -o docs/lib.es5.js

docs/lib.es5.min.js: docs/lib.es5.js
	node node_modules/.bin/uglifyjs docs/lib.es5.js -o docs/lib.es5.min.js

docs/index.html: docs/index.pug
	pug docs/index.html