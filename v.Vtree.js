v.Vtree = function() {
	
	var _a = [];
	
	var _getInsertIndex = function(mKey, nIndex, nLength) {
			nIndex  = (typeof nIndex  == 'undefined') ? 0         : nIndex;
			nLength = (typeof nLength == 'undefined') ? _a.length : nLength;
			
			var nInsertIndex,
				nIndexLeft   = nIndex,
				nLengthLeft  = Math.floor(nLength/2),
				nIndexRight  = nIndex + nLengthLeft,
				nLengthRight = nLength - nLengthLeft;
			
			if (nLength == 1) {
				if (mKey < _a[nIndex].getKey()) {
					nInsertIndex = nIndex;
				} else if (mKey > _a[nIndex].getKey()) {
					nInsertIndex = nIndex + 1;
				} else {
					throw 'Exception: duplicates are not allowed';
				}
			} else if (nLength == 0) {
				nInsertIndex = nIndex;
			} else {
				if (mKey < _a[nIndexLeft + nLengthLeft - 1].getKey()) {
					nInsertIndex = _getInsertIndex(mKey, nIndexLeft, nLengthLeft);
				} else if (mKey > _a[nIndexRight].getKey()) {
					nInsertIndex = _getInsertIndex(mKey, nIndexRight, nLengthRight);
				} else if (mKey == _a[nIndexLeft + nLengthLeft - 1].getKey() || mKey == _a[nIndexRight].getKey()) {
					throw 'Exception: duplicates are not allowed';
				} else {
					nInsertIndex = nIndexRight;
				}
			}
			return nInsertIndex;
		};

	this.insert = function(mKey, mData) {
		var oNode = new v.Vtree.Node(mKey, mData);
		_a.splice(_getInsertIndex(mKey), 0, oNode);
		this.display();
	}
	
	this.displayArray = function() {
		if (_a.length == 0) {
			console.log('Tree is empty :(');
		} else {
			var aResult = [];
			v.each(_a, function (n, oNode) {
				aResult.push(oNode.getKey());
			});
			console.log(aResult);
		}
	}
	
	this.display = function() {
		nIndent        = nIndent || 0;
		var nOldIndent = nIndent;
		nIndent       += mKey.toString().length + 2;
		
		var sLeft      = '',
			sRight     = '',
			sIndent    = v.strSpan(' ', nIndent),
			sOldIndent = v.strSpan(' ', nOldIndent),
			
			oParentIndex = Math.floor(_a.length/2),
			oParent = _a[oParentIndex],
			
			
		
		return mKey + '[\n' + sIndent + sLeft + ',\n' + sIndent + sRight + '\n' + sOldIndent + ']';
	}
}

v.Vtree.Node = function(mKey, mData) {
	
	this.getData = function() { return mData; }
	this.getKey  = function() { return mKey;  }
	
}

//[9, 10, 12, [15, 17], [20, 21, 23]
//[], [12]


