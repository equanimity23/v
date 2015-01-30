var v = {};

v.isArray = function(m) { return Object.prototype.toString.call(m) === '[object Array]'; }

v.each = function(o, f) {
	var n = 0;
	if (v.isArray(o)) {
		for (n=0; n<o.length; n++) {
			f(n, o[n], n);
		}
	} else {
		for (var s in o) {
			f(s, o[s], n);
			n ++;
		}
	}
}

v.walk = function(o, f) {
	var n = 0;
	if (v.isArray(o)) {
		for (n=0; n<o.length; n++) {
			o[n] = f(n, o[n], n);
		}
	} else {
		for (var s in o) {
			o[s] = f(s, o[s], n);
			n ++;
		}
	}
}

v.map = function(o, f) {
	var n = 0,
		m;
	if (v.isArray(o)) {
		m = [];
		for (n=0; n<o.length; n++) {
			m.push(f(n, o[n], n));
		}
	} else {
		m = {};
		for (var s in o) {
			m[s] = f(s, o[s], n);
			n ++;
		}
	}
	return m;
}

v.reduce = function(o, f) {
	var n = 0,
		m,
		mResult = null;
	if (v.isArray(o)) {
		for (n=0; n<o.length; n++) {
			m = o[n];
			mResult = f(n, m, mResult, n);
		}
	} else {
		for (var s in o) {
			m = o[s];
			mResult = f(s, m, mResult, n);
			n ++;
		}
	}
	return mResult;
}

v.timer = function(nInt, f, n) {
	if (typeof n == 'undefined') {
		n = 0;
	}
	if (f(n)) {
		setTimeout(function() {
			v.timer(nInt, f, n + 1);
		}, nInt);
	}
}

v.strSpan = function(s, nLen) {
	var sResult = '';
	for (var n=0; n<nLen; n++) {
		sResult += s;
	}
	return sResult;
}