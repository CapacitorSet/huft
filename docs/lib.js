const alphabet = 'abcdefghijklmnopqrstuvwxyz234567'.split('');
function toHuft(addr) {
	const parts = addr.match(/^([a-z2-7\-]+)(\.onion)?$/i);
	if (parts === null)
		throw new Error('Invalid address.');
	return parts[1]
		// Get an array of letters
		.split('')
		// Map letters to their index in the array
		.map((b) => alphabet.findIndex((char) => char == b))
		// Group them 12 bits at a time
		.map((n) => n.toString(2).padStart(5, '0'))
		.join('').padStart(84, '0')
		.match(/.{1,12}/g)
		// Transform each 12-bit group into a number, and get the corresponding word
		.map((n) => parseInt(n, 2))
		.map((n) => w[n])
		.join('-');
}

function toOnion(addr) {
	return addr
		.split('-')
		.map((word) => w.findIndex((val) => val == word))
		.map((n) => n.toString(2).padStart(12, '0'))
		.join('').padStart(84, '0')
		.reverse().match(/.{1,5}/g)
		.map((n) => parseInt(n.reverse(), 2))
		.map((n) => alphabet[n])
		.join('')
		.reverse()
		.slice(-16);
}

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
String.prototype.padStart = function padStart(targetLength, padString) {
	targetLength = Math.floor(Number(targetLength)); // floor if number or convert non-number to 0;
	padString = String(padString || ' ');
	if (this.length > targetLength) {
		return String(this);
	} else {
		targetLength = targetLength - this.length;
		if (targetLength > padString.length) {
			padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
		}
		return padString.slice(0, targetLength) + String(this);
	}
};

String.prototype.reverse = function() {
	return this.split('').reverse().join('');
};