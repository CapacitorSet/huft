# Huft: Human-friendly Tor

This project aims to define a human-friendly way to express .onion addresses. It translates .onion domains from the usual base32 form (http://expyuzz4wqqyqhjn.onion/) to a list of words (huft://todo/) and viceversa.

## Build instructions

 - Host `docs/index.html` on the HTTP Web on an address of your choosing (in this case, `https://capacitorset.github.io/huft/`)
 - Set the appropriate paths in `index.js`
 - Install Node.js and npm, install the required dependencies (`npm install jpm babel-cli babel-preset-es2015 uglify-js --save-dev`)
 - Run `make xpi`
 - Install the xpi in Firefox