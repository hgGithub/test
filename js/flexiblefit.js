/*
*Descrip: A flexible front-end fit for mobile-phone.
*Date: 2017/08/17
*设计稿以640*1136为参考
*rem = 100px;
*/
;(function(win, doc, undefined){

	'use strict';
	var ua = win.navigator.userAgent.toLowerCase(),
			timer = null;

	var devicePras = {
		isAndroid: function() {//判断终端设备是否为安卓
			return /android|adr/gi.test(ua) || false;
		},
		isIos: function() {//判断终端设备是否为苹果
			return (/iphone|ipod|ipad/gi.test(ua) && !this.isAndroid()) || false;
		},
		scale: function() { //返回viewpot缩放比例, 为高清适配所用。
			if(this.isIos()){
				return 1 / this.dpr();
			}else {
				return 1;
			}
		},
		dpr: function() { //返回设备dpr

			if(this.isIos()){
				return Math.min(win.devicePixelRatio, 3);
			}else{
				return 1;
			}
		}
	};

	//设置viewport
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
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}

		setFontSize();
	}

	//设置设备dpr，你可以根据该属性进行页面控制。
	function setDpr(docEle) {
		docEle.dataset.dpr = devicePras.dpr();
	};

	////设计稿以640*1136，及根节点字体100px为参考。
	function setFontSize(){
		var docEle = doc.documentElement,
			clientWidth = docEle.clientWidth;

		var fs = (clientWidth / 6.4).toFixed(3);      //字体大小保留三位小数,根据设计稿不同可以调整该系数（6.4）。
		if(/\.0{1,}/.test(fs)) fs = fs.slice(0, -4);  //如果是整数则继续保留整数的格式。

		docEle.style.fontSize = fs + "px";

	};
	
	function pageShowCallBack(e) {
		e = e || event;
		if(e.persisted) { //页面是否被缓存
			timer && clearTimeout(timer);

			timer = setTimeout(setViewport(doc.documentElement), 300);
		}
	};

	var init = function() {
		var docEle = doc.documentElement;
		setDpr(docEle);
		setViewport(docEle);

		if(win.addEventListener) { //监听pageshow事件，如果页面有过缓存则进行重新设置根节点大小。
			win.addEventListener('pageshow', pageShowCallBack, false);
		}else {
			win.attachEvent('onpageshow', pageShowCallBack);
		}

	};

	//兼容模块化调用
	if(typeof define === "function" && (define.cmd || define.amd)){
		define(function(require, exports, module) {
			module.exports = init;
		});
	}else {
		init();
	}

})(window, document);