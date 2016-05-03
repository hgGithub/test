"use strict";

(function(win,doc,undefined){
		var plugin = {
			long:function(pageCount,showLength){
				return pageCount <= showLength ? true : false;
			}
		};

		//TODO:投票人数多时，分页的处理
		$.fn.pagination = function(options){
			var self = $(this);
			var defaults = {
				pageLength:8,
				pageCount:8,
				current:1,
				pluginName:'page-area'
			},

			//初始化与默认配置合并。
			pageConfig = $.extend({},defaults,options);

			var conf = {
				initail:function(pageCount,showLength, name){
					var str = '<a href="javascript:void(0)" class="pre">« pre</a>',
						bShow = plugin.long(pageCount, showLength);

					if(bShow){
						for(var i = 0;i < pageCount; i++){
							if(pageConfig.current - 1 === i){
								str += '<a href="javascript:void(0)" class="current">' + (i + 1) + '</a>';
							}else{
								str += '<a href="javascript:void(0)">' + (i + 1) + '</a>';
							}
						}

						str +='<a href="javascript:void(0)" class="next">next »</a>';
						$('.' + name).append(str);
					}else{
						for(var i = 0;i < showLength; i++){
							if(showLength - 2 === i){
								str += '<span>…</span>';
							}else if(showLength - 1 === i){
								if(pageConfig.current - 1 === i){
									str += '<a href="javascript:void(0)" class="current">' + pageCount + '</a>';
								}else{
									str += '<a href="javascript:void(0)">' + pageCount + '</a>';
								}
							}else{
								if(pageConfig.current - 1 === i){
									str += '<a href="javascript:void(0)" class="current">' + (i + 1) + '</a>';
								}else{
									str += '<a href="javascript:void(0)">' + (i + 1) + '</a>';
								}
								
							}
						}

						str +='<a href="javascript:void(0)" class="next">next »</a>';
						$('.' + name).append(str);					
					};

					this.rlShow(pageConfig.current);
					this.eventBind();

				},
				rlShow:function(currentPage){
					if(currentPage === 1){
						self.find('.pre').css('display','none');
						self.find('.next').css('display','inline');
					}else if(currentPage === pageConfig.pageCount){
						self.find('.pre').css('display','inline');
						self.find('.next').css('display','none');
					}else{
						self.find('.pre').css('display','inline');
						self.find('.next').css('display','inline');						
					}
				},
				eventBind:function(){	
					self.on('click','a',function(e){
						e = e || window.event;
						var currentItem = $(e.target),
							pageText = currentItem.text();
						if(pageText !=="…"){
							var	className = currentItem.prop('class'),
								currentPage = parseInt(self.find('.current').text());

							pageClick(currentItem,className,currentPage);	
						}						
					});				
				},
				showLegthEven: function(){
					return pageConfig.pageLength % 2 ? false : true;
				},
				centerRel: function(){
					return Math.floor(pageConfig.pageLength / 2);
				},
				index:function(){
					var index = self.find('.current').index('.' + pageConfig.pluginName + ' a');
					return index;
				},
				aToPoint:function(pos){
					var tagName = "",
						item = null;
					if(pos === "before"){
						tagName = self.children().get(2).tagName;
						item = self.find('a:eq(1)');
						if(tagName === "A"){
							item.next().remove();
							item.after('<span>…</span>');
						}
					}else{
						tagName = self.children().get(-3).tagName;
						item = self.find('a').eq(-2);
						if(tagName === "A"){
							item.prev().remove();
							item.before('<span>…</span>');
						}
					}	
				},
				PointToa:function(pos){
					var tagName = "",
						item = null;					
					if(pos === "before"){
						tagName = self.children().get(2).tagName;
						item = self.find('a:eq(1)');
						if(tagName === "SPAN"){
							item.next().remove();
							item.after('<a href="javascript:void(0)"></a>');
						}
					}else{
						tagName = self.children().get(-3).tagName;
						item = self.find('a').eq(-2);
						if(tagName === "SPAN"){
							item.prev().remove();
							item.before('<a href="javascript:void(0)"></a>');
						}
					}											
				},
				startPage:function(){
					var start =  parseInt(self.children().get(3).text,10)
					return start;
				},
				endPage:function(){
					var end = parseInt(self.children().get(-4).text,10);
					return end;
				}				
			};
			conf.initail(pageConfig.pageCount, pageConfig.pageLength, pageConfig.pluginName);

			function pageShow(lpoint, rpoint, pageStart, pageEnd, currentPage){
				var section = pageEnd - pageStart,
					aCol = self.find('a');
				if((lpoint && rpoint) || (lpoint && !rpoint)){
					for(var i = 0; i <= section; i++){
						if(i + pageStart === currentPage){
							aCol.eq(i + 2).text(i + pageStart).addClass('current');
						}else{
							aCol.eq(i + 2).text(i + pageStart);
						}
					}
				}
				if((!lpoint && rpoint) || (!lpoint && !rpoint)){
					for(var i = 0; i <= section; i++){
						if(i + pageStart === currentPage){
							aCol.eq(i + 1).text(i + pageStart).addClass('current');
						}else{
							aCol.eq(i + 1).text(i + pageStart);
						}
					}
				}
			}

			//TODO:这里将也显示结构整理好。
			function pageClick(){
				var $this = arguments[0],
					clickedText = $this,
					className = arguments[1],
					currentPage = arguments[2];

				var bShow = plugin.long(pageConfig.pageCount, pageConfig.pageLength);
				self.find('.current').removeClass('current');	
						
				if(typeof(className) !== "string" || isNaN(currentPage)){
					return;
				}

				if(className.indexOf('pre') > -1){
					if(currentPage === 1){
						self.find('a').eq(1).addClass('current');
					}
					if(bShow && currentPage > 1){
						pageShow(false, false, 1, pageConfig.pageCount, currentPage - 1);
					}

					//(!bShow && conf.showLegthEven)
					if(!bShow){
						if(currentPage - 1 <= conf.centerRel()){
							conf.PointToa('before');
							conf.aToPoint('after');
							pageShow(false, true, 1, pageConfig.pageLength - 2, currentPage - 1);
						}

						if(currentPage - 1 > conf.centerRel() && currentPage - 1 < pageConfig.pageCount - conf.centerRel()){
							conf.aToPoint('before');
							conf.aToPoint('after');
							var start = conf.startPage(),
								end = conf.endPage();
							pageShow(true, true, start - 1, end - 1, currentPage - 1);
						}

						if(currentPage - 1 >= pageConfig.pageCount - conf.centerRel()){
							conf.aToPoint('before');
							conf.PointToa('after');
							var start = pageConfig.pageCount - (pageConfig.pageLength - 2) + 1,
								end = pageConfig.pageCount;	
							pageShow(true, false, start, end, currentPage - 1);						
						}
					}
				}else if(className.indexOf('next') > -1){
					if(currentPage === pageConfig.pageCount){
						self.find('a').eq(-2).addClass('current');
					}					
					if(bShow && currentPage < pageConfig.pageCount){
						pageShow(false, false, 1, pageConfig.pageCount, currentPage + 1)
					}

					if(!bShow){
						if(currentPage + 1 <= conf.centerRel()){
							conf.PointToa('before');
							conf.aToPoint('after');
							pageShow(false, true, 1, pageConfig.pageLength - 2, currentPage + 1);
						}

						if(currentPage + 1 > conf.centerRel() && currentPage + 1 < pageConfig.pageCount - conf.centerRel()){
							conf.aToPoint('before');
							conf.aToPoint('after');
							var start = conf.startPage(),
								end = conf.endPage();
							pageShow(true, true, start + 1, end + 1, currentPage + 1);
						}

						if(currentPage + 1 >= pageConfig.pageCount - conf.centerRel()){
							conf.aToPoint('before');
							conf.PointToa('after');
							var start = pageConfig.pageCount - (pageConfig.pageLength - 2) + 1,
								end = pageConfig.pageCount;	
							pageShow(true, false, start, end, currentPage + 1);						
						}
					}

				}else{
					if(bShow){
						pageShow(false, false, 1, pageConfig.pageCount, parseInt($this.text()))
					}else{
						var clickedPage = parseInt(clickedText.text());
						if(clickedPage <= conf.centerRel()){
							conf.PointToa('before');
							conf.aToPoint('after');
							pageShow(false, true, 1 , pageConfig.pageLength - 2, clickedPage);
						}
						if(clickedPage > conf.centerRel() && clickedPage < pageConfig.pageCount - conf.centerRel()){
							conf.aToPoint('before');
							conf.aToPoint('after');
							var start = conf.startPage(),
								end = conf.endPage();	
								
							if(clickedPage > currentPage){
								pageShow(true, true, start + 1 , end + 1, clickedPage);
							}else if(clickedPage < currentPage){
								pageShow(true, true, start - 1 , end - 1, clickedPage);
							}
						}
						if(clickedPage >= pageConfig.pageCount - conf.centerRel()){
							conf.aToPoint('before');
							conf.PointToa('after');
							var start = pageConfig.pageCount - (pageConfig.pageLength - 2) + 1,
								end = pageConfig.pageCount;								
							pageShow(true, false, start, end, clickedPage);
						}
					}
				}


				conf.rlShow(parseInt(self.find('.current').text(),10));
				return;
			}
		};
})(window,document);