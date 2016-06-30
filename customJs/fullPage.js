/*
*Author: HG
*Date: 2016/6/14
*The public js file for index.phtml,order.phtml and success.phtml.
*/

$(function($){

	//Operation obj
	var phoneTree = $('.pp4-container .page1 .p4-rela'),
		xiaoChe = $('.pp4-container .page1 .p4-che'),
		p4Ttitle = $('.pp4-container .page1 .p4-title'),
		balloon = $('.pp4-container .page1 .p4-balloon'),
		innerDownArrow = $('.down-arrow'),
		umbrella = $('.show-box .item2 .umbrella'),
		page2Head = $('.show-box .item2 .hand'),
		page2Text = $('.show-box .item2 .text'),
		page2UpCloud = $('.show-box .item2 .up'),
		page2DownCloud = $('.show-box .item2 .down'),
		page3Tree = $('.show-box .item3 .tree'),
		page3Dram = $('.show-box .item3 .re-dream'),
		page3Text = $('.show-box .item3 .page3 .text'),
		page3YunUp = $('.show-box .item3 .up');	
		page3YunDown = $('.show-box .item3 .down'),
		page3Moon = $('.show-box .item3 .moon'),
		page3People = $('.show-box .item3 .peple'),
		page3SmallPeo = $('.show-box .item3 .no-bkg .people'),
		page3Bird = $('.show-box .item3 .bird');			

	var roll = {
		pre:function(curIndex,showBox, winHeight){
			$('.nav').find('.active').removeClass('active').end().find('li').eq(curIndex + 1).addClass('active');
			showBox.stop(false,true).animate({'top': winHeight + 'px'}, 600,roll.rooClallBakc(curIndex, 'pre'));
		},
		next:function(curIndex,showBox, winHeight){
			$('.nav').find('.active').removeClass('active').end().find('li').eq(curIndex - 1).addClass('active');
			showBox.stop(false,true).animate({'top': winHeight + 'px'}, 600,roll.rooClallBakc(curIndex, 'next'));
		},
		isRoll: false,
		rooClallBakc:function(index,direct){
			if(index == 0 && direct == 'pre'){
				roll.recover('page1');
				roll.animate.page2();
			}else if(index == 1){
				roll.recover('page2');
				if(direct == 'pre'){
					roll.animate.page3();
				}else{
					roll.animate.page1();
				}
			}else if(index == 2 && direct == 'next'){
				roll.recover('page3');
				roll.animate.page2();
			}

			roll.isRoll = false;
		},
		index:function(){
			return $('.nav .active').index('.nav li');
		},
		timer:null,
		setPosition:function(){
			var index = roll.index(),
				winHeight = $('.pp4-container').height();

			if(index){
				if(index == 1){
					$('.show-box').css('top','-'+ winHeight + 'px');
				}else{
					$('.show-box').css('top','-'+ (winHeight * 2) + 'px');
				}
			}else{
				$('.show-box').css('top',0);
			}
		},
		animate:{
			newNav:function(obj){
				obj.animate({'backgroundPosition':'-147px 0'},500,function(){
					obj.animate({'backgroundPosition':'-264px 0'},500,function(){
						obj.animate({'backgroundPosition':'-29px 0'},500,function(){
							roll.animate.newNav(innerDownArrow);
						});
					});
				});				
			},
			page1:function(){
				setTimeout(function(){
					phoneTree.animate({'opacity':1}, 800,function(){
						xiaoChe.animate({'opacity':1}, 800,function(){
							p4Ttitle.animate({'opacity':1}, 1000,function(){
								balloon.animate({'opacity':1}, 500,function(){
									roll.animate.upAndDown(balloon);
								});
							});
						});
					});
				},100);
			},
			page2:function(){
				setTimeout(function(){
					page2DownCloud.animate({'bottom':0},1500);
					page2UpCloud.animate({'top':0},1000);
					umbrella.animate({'top':0},2000);
					page2Head.animate({'opacity':1},1000,function(){
						page2Text.animate({'bottom':'20px'},1000);
					});
				},50);				
			},
			page3:function(){
				setTimeout(function(){
					roll.animate.leftToRight(page3YunDown,'20px','150px');
					page3YunUp.animate({'opacity':1},1000,function(){
						roll.animate.rightToLeft(page3YunUp,'620px','500px');
					});
					page3Moon.animate({'opacity':1},500);
					page3Tree.animate({'bottom':0},1000);
					page3Bird.animate({'opacity':1,'bottom':'95px'},100,function(){
						page3SmallPeo.animate({'opacity':1},300);
						page3People.animate({'opacity':1},1000,function(){
							roll.animate.upDown(page3People,'20px','0');
							page3Dram.animate({'opacity':1},1000,function(){
								page3Text.animate({'opacity':1},function(){
									page3Text.animate({'top':'314px'},1000);
								});
							});
						});
					});

				},50);				
			},			
			leftToRight:function(obj,left,right){
				obj.animate({'left':right},3000,function(){
					obj.animate({'left':left},3000,function(){
						roll.animate.leftToRight(page3YunDown,'20px','150px');
					});
				});
			},
			rightToLeft:function(obj,left,right){
				obj.animate({'left':left},4000,function(){
					obj.animate({'left':right},4000,function(){
						roll.animate.rightToLeft(page3YunUp,'620px','500px');
					});
				});
			},			
			upDown:function(obj,top,down){
				obj.animate({'top':top},3000,function(){
					obj.animate({'top':0},3000,function(){
						roll.animate.upDown(page3People,'20px','0');
					});
				});
			},
			up:function(obj,distance, time){
				obj.animate({'bottom':distance + 'px'},500,function(){

				});
			},
			down:function(obj,distance,time){
				obj.animate({'top':distance + 'px'},500);
			},
			upAndDown:function(obj){
				obj.animate({'top':'-20px'},2000,function(){
					obj.animate({'top':'20px'},2500,function(){
						roll.animate.upAndDown(obj);
					});
				});
			}
		},
		recover:function(page){
			if(page == 'page1'){
				phoneTree.stop(false,true).animate({'opacity':0});
				xiaoChe.stop(false,true).animate({'opacity':0});
				p4Ttitle.stop(false,true).animate({'opacity':0});
			}else if(page == 'page2'){
					page2DownCloud.stop(false,true).animate({'bottom':'-219px'});
					page2UpCloud.stop(false,true).animate({'top':'-178px'});
					umbrella.stop(false,true).animate({'top':'-300px'});
					page2Head.stop(false,true).animate({'opacity':0});
					page2Text.stop(false,true).animate({'bottom':'-93px'});				
			}else if(page == 'page3'){
				page3Tree.stop(false,true).animate({'bottom':'-283px'});
				page3YunDown.stop(false,true).stop(false,true).animate({'left':'20px'});
				page3YunUp.stop(false,false).animate({'opacity':0,'left':'620px'});
				// page3YunUp.stop(false,true).css({'opacity':0,'left':'620px'});
				page3Moon.stop(false,true).animate({'opacity':0});
				// page3People.stop(false,true).css({'opacity':0,'top':0,'right':0,'filter':"Alpha('opacity',0)"});
				page3People.stop(false,false).animate({'opacity':0,'top':0,'right':0});
				page3SmallPeo.stop(false,true).animate({'opacity':0});
				page3Bird.stop(false,true).animate({'opacity':0,'bottom':'15px'});
				page3Dram.stop(false,true).animate({'opacity':0});
				page3Text.stop(false,true).animate({'opacity':0,'top':'500px'});
			}
		}
	}	

	//Initial the height page and roll area
	$('html,body').css('height','100%');
	rollAreaSize($('html,body').height() - 26);

	$(window).resize(function(){
		rollAreaSize($('html,body').height() - 26);
	});

	//First screen flash initial.
	roll.animate.page1();

	//Locate class 'pp4-container'
	function rollAreaSize(winHeight){
		$('.pp4-container,.show-box .section').css('height',winHeight + "px");
		roll.setPosition();
	}

	//Side bar nav click event.
	$('.pp4-container .nav').on('click','li',function(){
		var currentIndex = roll.index(),
			currentItem = $(this),
			showBox = $('.show-box'),
			winHeigth = $('.pp4-container').height(),
			indexClick = $(this).index('.pp4-container .nav li');
		
		var callBack = function(currentIndex, indexClick){
			roll.recover('page' + (currentIndex + 1));
			if(indexClick == 0){
				roll.animate.page1();
			}else if(indexClick == 1){
				roll.animate.page2();
			}else if(indexClick == 2){
				roll.animate.page3();
			}

			roll.isRoll = false;
		}

		if(!roll.isRoll){
			roll.isRoll = true;
			if(currentIndex == 0){
				if(indexClick == 1){
					$('.pp4-container .nav').find('.active').removeClass('active');
					currentItem.addClass('active');
					showBox.stop(false,true).animate({'top': ('-' + winHeigth) + 'px'}, 600, callBack(currentIndex, indexClick));
					
				}else if(indexClick == 2){
					$('.pp4-container .nav').find('.active').removeClass('active');
					currentItem.addClass('active');
					showBox.stop(false,true).animate({'top': ('-' + (2 * winHeigth)) + 'px'}, 600, callBack(currentIndex, indexClick));
				}
			}else if(currentIndex == 1){
				if(indexClick == 0){
					$('.pp4-container .nav').find('.active').removeClass('active');
					currentItem.addClass('active');
					showBox.stop(false,true).animate({'top': 0}, 600, callBack(currentIndex, indexClick));
					
				}else if(indexClick == 2){
					$('.pp4-container .nav').find('.active').removeClass('active');
					currentItem.addClass('active');
					showBox.stop(false,true).animate({'top': ('-' + (2 * winHeigth)) + 'px'}, 600, callBack(currentIndex, indexClick));
				}				
			}else if(currentIndex == 2){
				if(indexClick == 0){
					$('.pp4-container .nav').find('.active').removeClass('active');
					currentItem.addClass('active');
					showBox.stop(false,true).animate({'top': 0}, 600, callBack(currentIndex, indexClick));
					
				}else if(indexClick == 1){
					$('.pp4-container .nav').find('.active').removeClass('active');
					currentItem.addClass('active');
					showBox.stop(false,true).animate({'top': ('-' +  winHeigth) + 'px'}, 600, callBack(currentIndex, indexClick));
				}
			}
		}
	});

	// Listen mousewheel event.
	$('.pp4-container').on("mousewheel DOMMouseScroll",function(event,delta){
		event = event || window.event;
		var val = event.originalEvent.wheelDelta || -event.originalEvent.detail,
			activeIndex = roll.index(),
			showBox = $('.show-box'),
			winHeigth = $(this).height(),
			offset = parseInt(showBox.css('top').slice(0, -2));

		if(!roll.isRoll){
			roll.isRoll = true;
			if(val > 0 && activeIndex == 1){
				roll.next(activeIndex, showBox, 0);
			}else if(val > 0 && activeIndex == 2){
				roll.next(activeIndex, showBox, '-' + winHeigth);
			}else if(val < 0 && activeIndex == 0){
				roll.pre(activeIndex, showBox, '-' + winHeigth);
			}else if(val < 0 && activeIndex == 1){
				roll.pre(activeIndex, showBox, '-' + (winHeigth * 2));
			}else if(activeIndex == 0 || activeIndex == 2){
				roll.isRoll = false;
			}
		}

		return false;
	});	
	
	//If user have login
	function isLogin(){
		var val = $('#per-msg').data('msg');

		if(!val.isLogin){
			if(!val.isOrder){
				by.util.checkLogin(true, '',function() {
					window.location.href = '/dianping/main/passport4/index/order';
				})
			}else{
				by.util.checkLogin(true, '',function() {
					window.location.href = '/dianping/main/passport4/index/success';
				})				
			}
		}else{
			if(!val.isOrder){
				window.location.href = '/dianping/main/passport4/index/order';
			}else{
				window.location.href = '/dianping/main/passport4/index/success';
			}
		}
	}

	//Order enter click event.
	$('.content-box.page2').click(function(){
		isLogin();
	});

	//Determine if order.
	if($('.pp4-container').length){
		(function(){
			var val = $('#per-msg').data('msg'),
				orderState = $('.order-status');

			if(val.isOrder){
				orderState.removeClass('move-up');
				orderState.find('img').attr('src','/dianping/images/passport4/check.png');
			}else{
				orderState.find('img').attr('src','/dianping/images/passport4/middle.png');
				if(orderState.css('transition') == undefined || orderState.css('transition') == ''){
					var heartScale = function(){
						orderState.animate({'width':'425px','height':'121px','top':'92px'}, 350,function(){
							orderState.animate({'width':'415px','height':'112px','top':'97px'}, 1000,function(){
								heartScale();
							});
						});
					}

					heartScale();
				}else{
					orderState.addClass('move-up');
				}
			}
		})();
	}

	//Down arrow jump event.
	$('.show-box .section .down-arrow').each(function(){
		var current = $(this);
		current.click(function(){
			var currentIndex = roll.index(),
				showBox = $('.show-box'),
				winHeigth = $('.pp4-container').height();
			if(!roll.isRoll){
				roll.isRoll = true;
				if(currentIndex == 0){
					roll.pre(currentIndex, showBox, '-' + winHeigth);
				}else if(currentIndex == 1){
					roll.pre(currentIndex, showBox, '-' + (winHeigth * 2));
				}				
			}

		});
	})

	var rotation = function(){
		$('.show-box .item3 .rotate').rotate({
	          angle:0,
	          animateTo:360,
	          duration:1200,
	          callback: rotation,
	            easing: function (x,t,b,c,d){     
	                  return (t/d)*c ;
	         }
	     });		
	};
	rotation();

	function avenuRqur(item,url){
		$.ajax({
			url:url,
			dataType:'json',
			data:{'placeid':item},
			success:function(da){
				var code = da['code'],
					placeTimes = da['data'];
				if(!code){
					var length = placeTimes.length;
					if(length > 0){
						$('#get-time').find('option').not('.first').remove();

						var str = '';
						for(var i = 0; i < length;i++){
							if(i == 0){
								str += '<option value="' + placeTimes[i]['pppId'] + '" selected="selected">' + placeTimes[i]['placeTimes'] + '</option>';
							}
							else{
								str += '<option value="' + placeTimes[i]['pppId'] + '">' + placeTimes[i]['placeTimes'] + '</option>';
							}
						}

						$('#get-time').append(str);
					}
				}else{
					hm.alert({'text':da['message']});				
				}

			},
			error:function(){

			}
		});		
	};

	function picVerRqur(url){
		$.ajax({
			url:url,
			dataType:'json',
			// data:{'placeid':item},
			success:function(da){
				var code = da['code'],
					picLink = da['data'];
				if(!code){
					$('.pic-vefiy-box').find('img').attr('src',picLink);
				}else{
					hm.alert({'text':da['message']});					
				}

			},
			error:function(){

			}
		});		
	};

	function getMsgVer(pic,phoneNum,url){
		$.ajax({
			url:url,
			dataType:'json',
			data:{'graphCode':pic, 'mobile':phoneNum},
			success:function(da){
				var code = da['code'],
					duanxin = da['message'];
				if(!code){
					hm.alert({'text':duanxin});
				}else{
					hm.alert({'text':duanxin});					
				}

			},
			error:function(){

			}
		});		
	};

	function userSubmmit(mobileNum, mobileVerifyNum,avenue,avenuTime, url){
		$.ajax({
			url:url,
			dataType:'json',
			data:{'mobile':mobileNum, 'phoneCode':mobileVerifyNum,'placeid':avenue,'pppid':avenuTime},
			success:function(da){
				var code = da['code'],
					duanxin = da['message'];
				if(!code){
					window.location.href = '/dianping/main/passport4/index/success';
				}else{
					if(code == 6){
						$('.pp4-order-container .use-promp').html('您的手机号码已经被绑定，<a href="' + da['data']['url'] +'">点击此处申诉找回>></a>');
					}
					else{
						$('.pp4-order-container .use-promp').html(duanxin);
					}					
				}
			},
			error:function(){

			}
		});
	};

	function LanguageVer(pic,phoneNum,url){
		$.ajax({
			url:url,
			dataType:'json',
			data:{'graphCode':pic, 'mobile':phoneNum},
			success:function(da){
				var code = da['code'],
					resule = da['message'];
				if(!code){
					hm.alert({'text':resule});
				}else{
					$('.pp4-order-container .use-promp').html(resule);					
				}
			},
			error:function(){

			}
		});		
	};	

	picVerRqur('/dianping/ajax/main/ajax_captcha.php');


	$('#stadium').bind({
		'click':function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble = true;
			}
			
			var optLength = $(this).find('option').length;
			if(optLength <= 1){
				hm.alert({'text':"暂无可选场馆!"});
			}

			return false;
		},
		'change':function(){
			var currentVal = $(this).val();
			if(currentVal == "请选择场馆"){
				$('#get-time').find('option').not('.first').remove();
			}else{
				avenuRqur(currentVal,'/dianping/main/passport4/index/placetimes');	
			}
		}
	});


	//Change verify pic
	$('.pp4-order-container .pic-vefiy .varify').find('.change-pic').click(function(){
		picVerRqur('/dianping/ajax/main/ajax_captcha.php');
	});

	//Get phone verify code click evebt.
	$('.get-code').click(function(){
		var verifyCode = $('#pic-vefiy').val(),
			phone = $('#phone-num').val();
		if(!verifyCode || verifyCode == ""){
			hm.alert({'text':"请输入正确的图片验证码！"});
		}else{
			getMsgVer(verifyCode, phone, '/dianping/main/passport4/index/sendSmsCode');
		}
	});

	//sublime click event
	$('.sum-btn').click(function(){
		var mobileNum = $('#phone-num').val(),
		    mobileVerifyNum = $('#phone-code').val(),
		    avenue = $('#stadium').val(),
		    avenuTime = $('#get-time').val();

		if(!mobileNum){
			$('.pp4-order-container .use-promp').html("请输入正确的图片验证码！");
			return false;
		}else if(!mobileVerifyNum){
			$('.pp4-order-container .use-promp').html("请输入正确的手机验证码！");
			return false;
		}else if(!avenue){
			$('.pp4-order-container .use-promp').html("请选择正确的场馆！");
			return false;
		}else if(avenuTime == "请选择场馆"){
			$('.pp4-order-container .use-promp').html("场馆没有对应场次！");
			return false;
		}

		userSubmmit(mobileNum, mobileVerifyNum,avenue,avenuTime, '/dianping/main/passport4/index/save');

	});

	$('.language-ver.green').click(function(){
		var mobileNum = $('#phone-num').val(),
		    picVerify = $('#pic-vefiy').val();
		LanguageVer(picVerify,mobileNum,'/dianping/main/passport4/index/sendVoiceCode');
	});

	//Modify order message click event
	$('.end-modify').click(function(){
		window.location.href = '/dianping/main/passport4/index/order';
	});

});