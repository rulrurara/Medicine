$(document).ready(function(){
reloadPill();
reloadCalendar();
reloadVit();
reloadList();
reloadDrug(0);
	//calendar
 	$(".btn_rap").on("click", "span", function(){
		$("#page1").val("1");
		$("#page1").val($(this).attr("page1"));
		reloadPill();
	});	
	$(".selectbox").on("change" , function(){
		$("#numm").val($(this).val());
		drawMemo();
	})
	 $(".registerBtn").on("click", function	(){
		location.href = "MedihealthCal"
	});	

	//drug
	var cnt=0;
		$(document).on("click",".icon-right",function (){
		if(!$(".pic-all").is(":animated") ){
			cnt++;
			reloadDrug(cnt);
			$(".pic-all").animate({
				left:"-=1096px"
			},1300,"easeOutExpo");
		}}
		)
		$(document).on("click",".icon-left",function (){
		if(!$(".pic-all").is(":animated") ){
			cnt--;
			reloadDrug(cnt);
			$(".pic-all").animate({
				left:"+=1096px"
			},1300,"easeOutExpo");
		}}
		)

	//bmi
	$(".monthBtn").on("click",function(){
		reloadList2();

	})
	$(".dayBtn").on("click",function(){
		reloadList();

	})
		
// vit
   $("#questionIcon1").on("click", function(){
         $("#popup1").show();
      
   });
   
   $(".deleteIcon").on("click", function(){
         $("#popup1").hide();
   });
   
   $("#questionIcon2").on("click", function(){
         $("#popup2").show();
      
  });
   
   $(".deleteIcon").on("click", function(){
         $("#popup2").hide();
  });
  
   $(".reviseBtn").on("click", function(){
   location.href = "MediHealthInfo";
  });
  
})

//bmi
// Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
function reloadList(){
	$.ajax({
	url : "MediReportBmiAjax", 
	type : "post", 
	dataType : "json", 
	success : function(res) {
		var arr = []; 
		arr = res.data2;
			Highcharts.chart('container', {
	    chart: {
	        type: 'line'
	    },
	    title: {
	        text: '일별 BMI 지수'
	    },
	    xAxis: {
	        categories: res.data1
	    },
	    yAxis: {
	        title: {
	            text: 'BMI'
	        }
	    },
	    plotOptions: {
	        line: {
	            dataLabels: {
	                enabled: true
	            },
	            enableMouseTracking: false
	        }
	    },
	    series: [{
	        name: 'BMI',
	        data: res.data2
	    }]
	});
	},
	error : function(request, status, error) { 
		console.log(request.responseText) 
	}
	})
}
function reloadList2(){
	$.ajax({
	url : "MediReportBmiAjax", 
	type : "post", 
	dataType : "json", 
	success : function(res) {
			Highcharts.chart('container', {
	    chart: {
	        type: 'line'
	    },
	    title: {
	        text: '월별 BMI 지수'
	    },
	    xAxis: {
	        categories: res.data3	
	    },
	    yAxis: {
	        title: {
	            text: 'BMI'
	        }
	    },
	    plotOptions: {
	        line: {
	            dataLabels: {
	                enabled: true
	            },
	            enableMouseTracking: false
	        }
	    },
	    series: [{
	        name: 'BMI',
	        data: res.data4
	    }]
	});
	},
	error : function(request, status, error) { 
		console.log(request.responseText) 
	}
	})
}
function reloadDrug(cnt){
	$.ajax({
	url : "MediReportDrugAjax", 
	type : "post", 
	dataType : "json", 
	success : function(res) {
	drawDrug(res.list, res.list2, res.list3, cnt);
	
	},
	error : function(request, status, error) { 
		console.log(request.responseText) 
	}
	})
}

function drawDrug(list, list2, list3, i){
	var html ="";
	$(".pic-all").height(830 + list3[i].length*81);
	$(".pic-all").width(list.length*1096);
	for(var i=0 ; i<list.length; i++ ){
		html += "<div class=\"data"+i+"\">";
		html += "<table class=\"drug-table\"><tr>";
		html += "<th colspan=\"5\">제품정보</th>";
		html += "</tr><tr>";
		html += " <td colspan=\"5\" style=\"position: relative\">";
		html += "<img src=\"resources/upload/"+list[i].PROD_PIC+"\" class=\"itemImage\"><br>";
		html += " "+list[i].COM_NM+"<br>"+list[i].PROD_NM+"";
		if(i!=0){
			html += "<div class=\"icon-left\"></div>";			
		}
		if(i<list.length-1 ){
			html += "<div class=\"icon-right\"></div>";			
		}
		html += "</td></tr>";
		html += "<tr><th colspan=\"5\">제형</th></tr>";
		html += "<tr style=\"height:150px\">";
		html += "<td colspan=\"5\" style=\"border-right:1px solid #e5e5e5; width:20%;\">";
		html += "<img src=\"resources/upload/"+list[i].SHAPE_PIC+"\" class=\"imoImage\"><br>";
		html += "</td></tr>";
		html += "<tr><th colspan=\"3\" style=\"width: 330px\">기능성</th></tr>";
		html +=	"</table>";
		html += "<table id = \"Mid\" class=\"drug-table\" style=\"margin-top:0px !important;\"> ";
		html += "<tr class=\"ruru\" style=\"height:150px\">";
		for(var j = 0; j<list2[i].length; j++){		
			html += "<td><img src=\"resources/upload/"+list2[i][j].PIC+"\" class=\"imoImage\"></td>"
		}
		html += "</tr>";
		html += "<tr>";
		//html += "<th colspan=\"3\" class=\"vitTitle\">총 18개 영양소의 섭취량 입니다.</th>";
			html += "<th colspan=\"3\" class=\"vitTitle\">" +"총" + list3.length + "개 영양소의 섭취량 입니다." + "</th>";
		html += "</tr>";
		html += "</table>";
		html += "<div class=\"vitdiv\">";
		html += "<div class=\"wrap1\">";
		html += "<div class=\"inline\">";
		html += "<div class=\"explain1\" id=\"lack1\"></div>";
		html += "<div class=\"explain2\" >부족 섭취</div>";
		html += "</div>";
		html += "<div class=\"inline\">";
		html += "<div class=\"explain1\" id=\"opt1\"></div>";
		html += "<div class=\"explain2\" >적정 섭취</div>";
		html += "</div>";
		html += "<div class=\"inline\">";
		html += "<div class=\"explain1\" id=\"exc1\"></div>";
		html +="<div class=\"explain2\" >과다 섭취</div>";
		html +="</div>";
		html +="</div>";
		html +="<div class=\"wrap1\">";
		html +="<div class=\"eat1\">현재 섭취량</div>";
		html +="<div class=\"eat2\">적정 섭취량</div>";
		html +="</div>	";
		html +="<div class=\"rara\">";
		for(var h = 0; h<list3[i].length; h++){
			var cal = list3[i][h].FIG * 1 ;
			var cal2 = list3[i][h].MAX_PROP_TAKE_AMT * 1 ;
			var cal3 = list3[i][h].MIN_PROP_TAKE_AMT * 1 ;
			var cal4 = Math.ceil(cal/cal2 * 70);
			if(cal4 >= 100){
				cal4 = 100; 
			}
			html +="<div class=\"wrap2\">";
			html +="<div class=\"vit-txt\">"+list3[i][h].NUT_NM+"</div>";
			html +="<div class=\"vit-bar_wrap\">";
			if(cal<cal3){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:gray\"></div>";						
			}
			else if(cal3<=cal && cal<=cal2){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:green\"></div>";							
			}
			else if(cal2<cal){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:red\"></div>";							
			}
				html +="</div>";
				html +="<div class=\"eat3\">"+list3[i][h].MIN_PROP_TAKE_AMT+" ~ "+list3[i][h].MAX_PROP_TAKE_AMT+""+list3[i][h].UNIT+"</div>";
				html +="<div class=\"eat5\">"+list3[i][h].FIG+""+list3[i][h].UNIT+"</div>";
				html +="</div>";
				}
		html +="</div>";
		html +="</div>";
		html += "</div>";
		html += "</div>";
	
	}
	$(".pic-all").html(html);
}

/*vit*/

function reloadVit(){
	$.ajax({
	url : "MediReportVitAjax", 
	type : "post", 
	dataType : "json", 
	success : function(res) {
	resVit(res.list);
	resVit2(res.list2);
	},
	error : function(request, status, error) { 
		console.log(request.responseText) 
	}
	})
}

function resVit(list){
	var html = "";
		for(var data of list){
			var cal = data.FIG * 1 ;
			var cal2 = data.MAX_PROP_TAKE_AMT * 1 ;
			var cal3 = data.MIN_PROP_TAKE_AMT * 1 ;
			var cal4 = Math.ceil(cal/cal2 * 70);
			if(cal4>=100){
				cal4 = 100;
			}
			html += "<div class= \"wrap2\">";	
			html += "<div class=\"vit-txt\">" + data.NUT_NM + "</div>";
			html += "<div class=\"vit-bar_wrap\">";
			if(cal<cal3){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:gray\"></div>";						
			}
			else if(cal3<=cal && cal<=cal2){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:green\"></div>";							
			}
			else if(cal2<cal){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:red\"></div>";							
			}
			html += "</div>";
			html += "<div style=\"display:inline-block\">";
			html +="<div class=\"eat3\">"+data.MIN_PROP_TAKE_AMT+" ~ "+data.MAX_PROP_TAKE_AMT+""+data.UNIT+"</div>";
			html +="<div class=\"eat5\">"+data.FIG+""+data.UNIT+"</div>";
			html += "</div>";
		}
	$(".vitdivEssen").html(html);
}

function resVit2(list2){
	var html = "";
		for(var data of list2){
			var cal = data.FIG * 1 ;
			var cal2 = data.MAX_PROP_TAKE_AMT * 1 ;
			var cal3 = data.MIN_PROP_TAKE_AMT * 1 ;
			var cal4 = Math.ceil(cal/cal2 * 70);
			if(cal4>=100){
				cal4 = 100;
			}
			html += "<div class= \"wrap2\">";	
			html += "<div class=\"vit-txt\">" + data.NUT_NM + "</div>";
			html += "<div class=\"vit-bar_wrap\">";
			if(cal<cal3){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:gray\"></div>";						
			}
			else if(cal3<=cal && cal<=cal2){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:green\"></div>";							
			}
			else if(cal2<cal){
				html +="<div class=\"vit-bar\" style=\"width:"+cal4+"%;background-color:red\"></div>";							
			}
			html += "</div>";
			html += "<div style=\"display:inline-block\">";
			html +="<div class=\"eat3\">"+data.MIN_PROP_TAKE_AMT+" ~ "+data.MAX_PROP_TAKE_AMT+""+data.UNIT+"</div>";
			html +="<div class=\"eat5\">"+data.FIG+""+data.UNIT+"</div>";
			html += "</div>";
		}
	$(".vitdivFunc").html(html);
}
//calendar
function reloadCalendar(){
// AJAX돌면서 캘린더가 그려지기 때문에 PILL에 값이 안들어가 있으니 AJAX안에 캘린더 그리는걸 넣어야 함
var pill=new Array();
var wrap = "";
var data=""
var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthPillAjax/select", 
		type : "post", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
				var pillCnt = 0;
				var oneCnt=0;
				var cnt = 0;
				for(data1 of res.list){
			    pillCnt = data1.TAKE_AMT * 1;
			    oneCnt = data1.ONE_CNT_TAKE_AMT * 1;
			    cnt = pillCnt / oneCnt;
			    if(cnt > 1){
					for(i=0 ; i<cnt ; i++){
				    pill.push(
				          {
				            //title: 'All Day Event',
				            start: data1.Y_M_D,
				            color : '#00000000', 
							//textColor : 'black',
							icon : 'userPage/phils/'+ data1.PILL_PIC_NUM+'.png',
				          }
				       );		
					}
				}
				else{
				    pill.push(
				          {
				            //title: 'All Day Event',
				            start: data1.Y_M_D,
				            color : '#00000000', 
							//textColor : 'black',
							icon : 'userPage/phils/'+ data1.PILL_PIC_NUM+'.png',
				          }
				) 
					}
				}
				$("#fullCalendarArea").fullCalendar({
					header : {
						left: '',
				        center: 'prev,title,next',
						  right:  ''
						},
				      defaultDate: new Date(),
				      locale: "ko",
				      editable: false,
				      height: 750,
				      events: pill,
				      eventRender: function(event, element, view) {
					
					        if(event.icon){
					            if(event.allDay){
					                $(element).find('span:first').prepend('<img class="calpill" src="resources/images/'+event.icon+'" />');
					            }else{
					                $(element).find('.fc-time').prepend('<img class="calpill" src="resources/images/'+event.icon+'" />');
					            }
					        }
					        if(event.icon1){
					            if(event.allDay){
					                $(element).find('span:first').prepend('<img class="calpill" src="resources/images/'+event.icon1+'" />');
					            }else{
					                $(element).find('.fc-time').prepend('<img class="calpill" src="resources/images/'+event.icon1+'" />');
					            }
					        }
					    },
				      eventClick: function(event) { // 이벤트 클릭
				    	  //오늘 날짜 가져오기
				    	//  var moment = $('#fullCalendarArea').fullCalendar('getDate');
                        //  var day = moment.format("YYYY-MM-DD");
				    	  $("#Date").val(event.start.format("YYYY-MM-DD"));
				    	    drawSelect();
				    	    drawMemo();

				      },
				      dayClick: function(date, js, view) { // 일자 클릭
				    	  $("#Date").val(date.format());
							drawSelect();
				    	    drawMemo();
				      }
				});
				
					
		},
		error : function(request, status, error) { 
			console.log(request.responseText) 
		}
	})
}
function reloadPill(){
   var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthReportCalAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawCalendar(res.listCal);
			drawPaging3(res.pd2);
			drawSelect()
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function drawCalendar(list){
	var html = "";	
	for(var data of list){
		html += "<div class=\"pillWrap\">"
	 	if(data.SHAPE_NUM ==1){
	 		html += "<div class=\"txt_pill\"> "+data.PROD_NM+" <br> 1회당 섭취량 : "+data.ONE_CNT_TAKE_AMT+" 개</div>  ";
		}
	 	if(data.SHAPE_NUM ==2){
	 		html += "<div class=\"txt_pill\"> "+data.PROD_NM+" <br> 1회당 섭취량 : "+data.ONE_CNT_TAKE_AMT+" 스푼</div>  ";
		}
	 	if(data.SHAPE_NUM ==3){
	 		html += "<div class=\"txt_pill\"> "+data.PROD_NM+" <br> 1회당 섭취량 : "+data.ONE_CNT_TAKE_AMT+" ml</div>  ";
		}
	 	html += "<div class=\"pill\"><img src=\"resources/images/userPage/phils/"+data.PILL_PIC_NUM+".png\"/></div>";
	 	html += "</div>"	
	}	
	$(".txt_rap").html(html);
}
function drawPaging3(pd2) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page1=\"1\">처음</span>";
	
	// 이전
	if($("#page1").val() == "1"){
		html += "<span class=\"page_btn page_prev\" page1=\"1\">이전</span>";
	} else{
		html += "<span class=\"page_btn page_prev\" page1=\"" + ($("#page1").val() * 1 - 1) + "\">이전</span>";
	}
	
	for(var i=pd2.startP; i<=pd2.endP; i++){
		if($("#page1").val() *1 == i){ // 현재 페이지
			html += "<span class=\"page_btn_on\" page1=\"" + i + "\"> " + i + "</span>";
		}else{ // 다른 페이지
			html += "<span class=\"page_btn\" page1=\"" + i + "\"> " + i  + "</span>";
		}
	}
	if($("#page1").val() *1 == pd2.maxP){ // 현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page1=\"" + pd2.maxP + "\">다음</span>";		
	}else{
		html += "<span class=\"page_btn page_next\" page1=\"" + ($("#page1").val() * 1 + 1) + "\">다음</span>";
	}
	
	html += "<span class=\"page_btn page_last\" page1=\"" + pd2.maxP + "\">마지막</span>";
	
	$(".btn_rap").html(html);
}
function drawSelect(){
	var params = $("#actionForm1").serialize();
	var html = "";	
	$.ajax({
		url : "healthCalMemo/select2",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			if(res.list2.length != 0){
				$("#numm").val(res.list2[0].HEALTH_FUN_FOOD_NUM);
			}
			for(data of res.list2){
				html+="<option value=\""+data.HEALTH_FUN_FOOD_NUM+"\">"+ data.PROD_NM+"</option>";
			}
				$(".selectbox").html(html);
				drawMemo();
			
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function drawMemo(){
	   var params = $("#actionForm1").serialize();
		var html = "";	
	$.ajax({
		url : "healthCalMemo/select1",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			if(res.list ==null || res.list==""){
				html +="<tr> "; 	
				html +="<th class=\"table1-th1\">복용량</th> "; 	
				html +="<td class=\"table1-td\"></td> "; 	
				html +="<th class=\"table1-th1\">복용날짜</th> "; 	
				html +="<td class=\"table1-td\" id=\"#time\"></td> "; 	
				html +="</tr> "; 	
				html +="<tr class=\"table1-tr2\"> "; 	
				html +="<th class=\"table1-th2\">메모</th> "; 	
				html +="<td colspan=\"3\" class=\"table1-td\">섭취일지를 작성해 주세요</td>"; 	
				html +="</tr> "; 	
				html +=" "; 	
				$(".table1").html(html);
			}else{
				html +="<tr> "; 	
				html +="<th class=\"table1-th1\">복용량</th> "; 	
				html +="<td class=\"table1-td\">"+res.list.TAKE_AMT+"</td> "; 	
				html +="<th class=\"table1-th1\">복용날짜</th> "; 	
				html +="<td class=\"table1-td\" id=\"#time\">"+res.list.Y_M_D+"</td> "; 	
				html +="</tr> "; 	
				html +="<tr class=\"table1-tr2\"> "; 	
				html +="<th class=\"table1-th2\">메모</th> "; 	
				if(res.list.MEMO  == undefined) {
					html +="<td colspan=\"3\" class=\"table1-td\">작성된 메모가 없습니다.</td>"; 	
				}else{
					html +="<td colspan=\"3\" class=\"table1-td\">"+res.list.MEMO+"</td>"; 	
				}
				html +="</tr> "; 	
				html +=" "; 	
				$(".table1").html(html);
			}
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}