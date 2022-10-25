var count = 0;

var previousScroll = 0;
var cnt = 0;
var flag = true;
var maxPage = 4;
$(document).ready(function() {
	
	$(".menuNewAccount").on("click", function() {
		location.href="memReg";
	});
	$(".userlogin").on("click",function(){
		location.href="memReg";
	});
	$(".menuLogoutBtn").on("click", function() {
		location.href="MediLogout";
	});
	$(".loginBtn1").on("click",function(){
		location.href="MediLogin";
	});
	$(".medicine_Info").on("click",function(){
		location.href="medicineInfoMain";
	});
	$(".health_Mgt").on("click",function(){
		location.href="MediHealthMain";
	});
	$(".medicine_Compare").on("click",function(){
		location.href="MediCompare";
	});
	$(".freeBoard").on("click",function(){
		location.href="MediFreeList";
	});
	$(".service_center").on("click",function(){
		location.href="MediServiceQna";
	});
	$(".mypage").on("click",function(){
		location.href="MyPage";
	});
	
						$("#fullCalendarArea").fullCalendar({
							header : {
								left : '',
								center : 'prev,title,next',
								right : ''
							},
							defaultDate : '2022-08-16',
							locale : "ko",
							editable : false,
							height : 800,
							eventClick : function(event) { // 이벤트 클릭
								alert(event.start);
							},
							dayClick : function(date, js, view) { // 일자 클릭
								alert('Clicked on: ' + date.format());
								$(".enroll_txt").show();
								//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

								//alert('Current view: ' + view.name);
							}
						});
						Highcharts
								.chart(
										'container',
										{
											chart : {
												type : 'line'
											},
											title : {
												text : '임의의 그래프입니다.'
											},
											subtitle : {
												text : 'Source: '
														+ '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
        'target="_blank">Wikipedia.com</a>'
											},
											xAxis : {
												categories : [ 'Jan', 'Feb',
														'Mar', 'Apr', 'May',
														'Jun', 'Jul', 'Aug',
														'Sep', 'Oct', 'Nov',
														'Dec' ]
											},
											yAxis : {
												title : {
													text : 'Temperature (°C)'
												}
											},
											plotOptions : {
												line : {
													dataLabels : {
														enabled : true
													},
													enableMouseTracking : false
												}
											},
											series : [
													{
														name : '일별 그래프',
														data : [ 16.0, 18.2,
																23.1, 27.9,
																32.2, 33.4,
																39.8, 38.4,
																35.5, 29.2,
																22.0, 17.8 ]
													},
													{
														name : '월별 그래프',
														data : [ -2.9, -3.6,
																-0.6, 4.8,
																10.2, 14.5,
																17.6, 16.5,
																12.0, 6.5, 2.0,
																-0.9 ]
													} ]
										});
						$(".menu").on("click", function() {
							$(".bar").animate({
								marginLeft : "0px"
							}, 100)
						});

						$("html").on(
								"click",
								function(e) {
									if (!$(e.target).is(".menu")
											&& !$(e.target).is(".bar")
											&& !$(e.target).parent().is(".bar")
											&& !$(e.target).parent().parent()
													.is(".bar")) {
										$(".bar").animate({
											marginLeft : "-300px"
										}, 100);
									}
						
								})
						$("html").on("click", function(e) {
							if ($(e.target).is(".icon-right") && count <5) {
								count++;
								$(".brunch").animate({
									marginLeft : "-=800px"
								}, 100);
							} else if ($(e.target).is(".icon-left") && count > 0) {
								count--;
								$(".brunch").animate({
									marginLeft : "+=800px"
								}, 100);
							}
						})
						$(".txt_title").on("click", function() {
							$(".txtnamerap").show();
						});
						$(".txt_title2").on("click", function() {
							$(".txtnamerap").hide();
						});
						
						$(".loginBtn1").on("click",function() {
							if($(".userId_border2").css("display") == "none"){
								$(".userId_border2").css("display","block");
								$(".userId_border").css("display","none");
							}					
						});
						$("#logoutBtn").on("click",function() {
							location.href="MediLogout";
						});
						

						$(window)
								.on(
										"scroll",
										function(event) {
											console.log(!$("html").is(":animated"));
											if (!$("html").is(":animated") && flag) {

												var currentScroll = $(this)
														.scrollTop();

												console.log(currentScroll + ","
														+ previousScroll);

												if (currentScroll > previousScroll + 50) {
													flag = false;
													cnt++;

													if (cnt > maxPage) {
														cnt = maxPage;
													}

													$("html,body")
															.animate(
																	{
																		scrollTop : vh(100 * cnt)
																				+ "px"
																	},
																	500,
																	function() {
																		previousScroll = vh(100 * cnt);
																		flag = true
																	});
												} else if (currentScroll < previousScroll - 30) {
													flag = false;
													cnt--;

													if (cnt < 0) {
														cnt = 0
													}

													$("html,body")
															.animate(
																	{
																		scrollTop : vh(100 * cnt)
																				+ "px"
																	},
																	500,
																	function() {
																		previousScroll = vh(100 * cnt);
																		flag = true
																	});
												}
											}
											return false;
										});
						$(".bottom_txt").on("click",function(){
							flag = false;
							cnt++;

							if (cnt > maxPage) {
								cnt = maxPage;
							}

							$("html,body")
									.animate(
											{
												scrollTop : vh(100 * cnt)
														+ "px"
											},
											500,
											function() {
												previousScroll = vh(100 * cnt);
												flag = true
											});
							});
							$(".menuLoginBtn").on("click", function() {
		location.href="MediLogin";
	});
					});
	function vh(v) {
		var h = Math.max(document.documentElement.clientHeight,
				window.innerHeight || 0);
		return (v * h) / 100;
	}