v.Canvas = function(oContainer, nW, nH) {
	var _oCanvas,
		_oContext,
		_oThis = this;
		
	var _construct = function() {
			console.log('construct');
			_oCanvas = document.createElement('canvas');
			_oCanvas.setAttribute('width', nW + 'px');
			_oCanvas.setAttribute('height', nH + 'px');
			oContainer.appendChild(_oCanvas);
			_oContext = _oCanvas.getContext('2d');
		};
		
	/**************** PUBLIC ****************/
	
	this.getPixel = function(nX, nY) {
		return _oContext.getImageData(nX, nY, 1, 1).data;
	}
	
	this.setPixel = function(nX, nY, aColor) {
		var oPixel = _oContext.createImageData(1, 1);
		for (var n=0; n<aColor.length; n++) {
			oPixel.data[n] = aColor[n];
		}
		_oContext.putImageData(oPixel, nX, nY);
	}
	
	this.moveTo = function(nX, nY) {
		_oContext.beginPath();
		_oContext.moveTo(nX, nY);
	}

	this.lineTo = function(nX, nY) {
		_oContext.strokeStyle = '#000000';
		_oContext.lineTo(nX, nY);
		_oContext.stroke();
	}
	
	this.fill = function(nX, nY, aColor, aBgColor) {
		aBgColor = aBgColor || this.getPixel(nX, nY);
		setTimeout(function() {
			if (_oThis.hasColor(nX, nY, aBgColor)) {
				_oThis.setPixel(nX, nY, aColor);
				_oThis.fill(nX - 1, nY, aColor, aBgColor);
				_oThis.fill(nX + 1, nY, aColor, aBgColor);
				_oThis.fill(nX, nY - 1, aColor, aBgColor);
				_oThis.fill(nX, nY + 1, aColor, aBgColor);
			}
		}, 200);
	}
	
	this.hasColor = function(nX, nY, aColor) {
		var aPixel = this.getPixel(nX, nY);
		for (var n=0; n<aColor.length; n++) {
			if (aPixel[n] != aColor[n]) {
				return false;
			}
		}
		return true;
	}

	_construct();
}