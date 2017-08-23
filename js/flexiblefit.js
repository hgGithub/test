/*
*Descrip: A flexible front-end fit for phone.
*Date: 2017/08/17
*设计稿以640*1136为参考
*rem = 100px;
*
*/
;(function(win, doc, undefined){

	'use strict';
	var ua = win.navigator.userAgent.toLowerCase();

	var devicePras = {
		isAndroid: function() {

			return /android|adr/gi.test(ua) || false;
		},
		isIos: function() {

			return (/iphone|ipod|ipad/gi.test(ua) && !this.isAndroid()) || false;
		},
		scale: function() {
			if(this.isIos()){


				return 1 / this.dpr();
			}else {

				return 1;
			}
		},
		dpr: function() {

			if(this.isIos()){

				return Math.min(win.devicePixelRatio, 3);
			}else{

				return 1;
			}
		}
	};

	function setViewport(docEle) {
		var metaEl = doc.querySelector('meta[name="viewport"]');
		metaEl && metaEl.remove();

		var dw = docEle.clientWidth * devicePras.dpr();
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		metaEl.setAttribute("content", "initial-scale=" + devicePras.scale() + ", maximum-scale=" + devicePras.scale() + 
			", minimum-scale=" + devicePras.scale() + ", user-scalable=no");

		if(docEle.firstElementChild) {
			docEle.firstElementChild.appendChild(metaEl);
		}else{
			var wrap = document.createElement('div');
			wrap.appendChild(metaEl);
			document.write(wrap.innerHTML);
		}
	}

	function setDpr(docEle) {
		docEle.dataset.dpr = devicePras.dpr();
	};

	function setFontSize(){
		var docEle = document.documentElement,
			clientWidth = docEle.clientWidth;

		var fs = (clientWidth / 6.4).toFixed(3);      //字体大小保留三位小数
		if(/\.0{1,}/.test(fs)) fs = fs.slice(0, -4);  //如果是整数则继续保留整数的格式。

		docEle.style.fontSize = fs + "px";	//设计稿以640*1136，及根节点字体100px为参考。
		setDpr(docEle);
		setViewport(docEle);
	};

	setFontSize();

})(window, document);