// Number.prototype.increment = function() {
// 	return this + 1;
// }

String.prototype.trim = function(sTrimChars) {
	sTrimChars = sTrimChars || ' \t\n';
	
	var nBegin,
		nEnd;
		
	for (nBegin=0; nBegin<this.length; nBegin++) {
		if (sTrimChars.indexOf(this.charAt(nBegin)) == -1) {
			break;
		}
	}
	
	for (nEnd=this.length-1; nEnd>=nBegin; nEnd--) {
		if (sTrimChars.indexOf(this.charAt(nEnd)) == -1) {
			break;
		}
	}
	
	return this.substring(nBegin, nEnd+1);
}

//' \n 234  hel    \n  \t   lo  123 \n \t'