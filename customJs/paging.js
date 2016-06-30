/*
*Author: HG
*Date:2016/6/22
*/

$(function(){

	var pageTotle = 1;

	//Change page click event.
	$('.topic-list-pages').on('click', "a" ,function(e){
		e = e || window.event;
		var className = e.target.className,
			currentPage = parseInt($('.topic-list-pages').find('.active').text());

		if(className.indexOf('pre') > -1){
			pageAjax(currentPage - 1);
		}else if(className.indexOf('next') > -1){
			pageAjax(currentPage + 1);
		}else if(className.indexOf('ellipsis') == -1){
			pageAjax(parseInt(e.target.innerText));
		}

		return false;
	});

	//Content show
	var listShow = function(list){
		var items = list,
			length = items.length,
			str = '';

		for(var i = 0; i < length;i++){
			str += '<li><a href="' + items[i]['url'] + '"><div class="img-box"><img src="' + items[i]['cover'] + '" alt=""></div><p class="title"\
			 title="' + items[i]['name'] + '">' + items[i]['name'] + '</p></a></li>';
		}

		$('.topic-list_container .list-box ul').empty();
		$('.topic-list_container .list-box ul').append(str);
	}

	//Paging Show
	var pageShow = function(page){
		var pagesBox = $('.topic-list-pages'),
			str = '';

		if(page == 1 && pageTotle ==  page){
			pagesBox.find('.pre').css('display','none');
			pagesBox.find('.next').css('display','none');
		}else{
			if(page == 1){
				pagesBox.find('.pre').css('display','none');
				pagesBox.find('.next').css('display','inline-block');
			}else if(page == pageTotle){
				pagesBox.find('.pre').css('display','inline-block');
				pagesBox.find('.next').css('display','none');
			}else{
				pagesBox.find('.pre').css('display','inline-block');
				pagesBox.find('.next').css('display','inline-block');
			}			
		}

		if(pageTotle > 7){
			if(page >= 4 && page <= (pageTotle - 3)){
				str += '<a href="javascript:void(0)">1</a><a href="javascript:void(0)" class="ellipsis">...</a>';
				for(var i = 0; i < 5; i++){
					if(i == 2){
						str += '<a href="javascript:void(0)" class="active">' + (i + page - 2) + '</a>';
					}else{
						str += '<a href="javascript:void(0)">' + (i + page - 2) + '</a>';
					}
				}

				str += '<a href="javascript:void(0)" class="ellipsis">...</a><a href="javascript:void(0)">' + pageTotle + '</a>';
			}else if(page < 4){
				for(var i = 0; i < 5; i++){
					if(page == (i + 1)){
						str += '<a href="javascript:void(0)" class="active">' + (i + 1) + '</a>';
					}else{
						str += '<a href="javascript:void(0)">' + (i + 1) + '</a>';
					}
				}
				str += '<a href="javascript:void(0)" class="ellipsis">...</a><a href="javascript:void(0)">' + pageTotle + '</a>';
			}else if(page > (pageTotle - 3)){
				str += '<a href="javascript:void(0)">1</a><a href="javascript:void(0)" class="ellipsis">...</a>';
				for(var i = 0; i < 5; i++){
					if(page == (i + pageTotle - 4)){
						str += '<a href="javascript:void(0)" class="active">' + (i + pageTotle - 4) + '</a>';
					}else{
						str += '<a href="javascript:void(0)">' + (i + pageTotle - 4) + '</a>';
					}
				}
			}			

		}else{
			for(var i = 0; i < pageTotle;i++){
				if(page == (i + 1)){
					str += '<a href="javascript:void(0)" class="active">' + (i + 1) + '</a>';
				}else{
					str += '<a href="javascript:void(0)">' + (i + 1) + '</a>';
				}
			}
		}

		pagesBox.find('a').not('.pre,.next').remove();
		pagesBox.prepend(str);
	}

	var pageAjax = function(page){
		var url = "/topic/topiclist/?a=l&page=";

		$.ajax({
			url:encodeURI(url + page),
			type:'Get',
			dataType:'json',
			success:function(res){
				var status = res['status'],
					total = res['data']['totalPage'],
					items = res['data']['list'];

				if(status){
					if(!total || items === undefined || items === null){
						return false;
					}

					pageTotle = total;
					listShow(items);
					pageShow(page);

				}else{
					hm.toast({'text':'数据获取失败！'});
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				hm.toast({'text':'数据获取失败！'});
			}

		});

	};

	var init = function(){
		pageAjax(1);
	};

	init();
});