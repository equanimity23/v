v.LocalStorage = new function() {
	var _sPrefix = '__v__';
	
	this.set = function(sKey, mValue) {
		sKey = _sPrefix + sKey;
		localStorage.setItem(sKey, JSON.stringify(mValue));
	};
	
	this.get = function(sKey) {
		sKey = _sPrefix + sKey;
		return localStorage.getItem(sKey);
	};
	
	this.isSet = function(sKey) {
		sKey = _sPrefix + sKey;
		return this.get(sKey) !== null;
	}
	
	this.unset = function(sKey) {
		sKey = _sPrefix + sKey;
		localStorage.removeItem(sKey);
	};
};