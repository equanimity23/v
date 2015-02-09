v.Canvas = function(oContainer, nW, nH) {
	var _oCanvas,
		_oContext,
		_oThis = this;
		
	var _construct = function() {
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
		_oContext.moveTo(nX-0.5, nY-0.5);
	}

	this.lineTo = function(nX, nY, nLineWidth, sColor) {
		nLineWidth = nLineWidth || 1;
		sColor     = sColor     || '#000000';

		_oContext.lineWidth   = nLineWidth;
		_oContext.strokeStyle = sColor;
		_oContext.lineTo(nX-0.5, nY-0.5);
		_oContext.stroke();
		_oContext.closePath();
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
	
	this.clear = function(sColor) {
		_oContext.clearRect(0, 0, nW, nH);
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
	
	this.circle = function(nX, nY, nR, sColor) {
		_oContext.beginPath();
		_oContext.arc(nX, nY, nR, 0, 2*Math.PI);
		_oContext.strokeStyle = sColor;
		_oContext.stroke();
		_oContext.closePath();
	}
	
	this.text = function(sText, nX, nY, bFill, sColor, nSize, sFont) {
		bFill  = bFill  || false;
		sColor = sColor || '#000000';
		nSize  = nSize  || 12;
		sFont  = sFont  || 'arial';
		
		_oContext.font         = nSize + 'px ' + sFont;
		_oContext.textAlign    = 'center';
		_oContext.textBaseline = 'middle';
		
		var sTemp;
		if (bFill) {
			sTemp = _oContext.fillStyle;
			_oContext.fillStyle = sColor;
			_oContext.fillText(sText, nX, nY);
			_oContext.fillStyle = sTemp;
		} else {
			sTemp = _oContext.strokeStyle;
			_oContext.strokeStyle = sColor;
			_oContext.strokeText(sText, nX, nY);
			_oContext.strokeStyle = sTemp;
		}
	}

	_construct();
}