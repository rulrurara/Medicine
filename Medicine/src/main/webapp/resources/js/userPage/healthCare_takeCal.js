$(document).ready(function(){
	reloadList();
	reloadList2();
	reloadCalendar();

	
	$(document).on("click",".upd", function() {
		$(this).parent().children().children(".AMT").attr("readonly",false);
		$(this).hide();
		$(this).parent().children(".reg").show();
		
	});
	
	$("#goInfo").on("click", function	(){
		location.href = "MediHealthInfo"
	});	

	
	$(".selectBox").on("change" , function(){
		$("#numm").val($(this).val());
		drawMemo();
	})
	$(document).on("click",".pillBtn1", function() {
		if($("#Date").val() == null || $("#Date").val() == "" ){
			alert("날짜를 선택해 주세요")
		}
		else{
			
		$("#takeAmt").val($(this).attr("amt"));
		$("#numm").val($(this).attr("num"));
		pillInsert();
			
		}
	});
	$(document).on("click",".pillBtn2", function() {
		if($("#Date").val() == null || $("#Date").val() == "" ){
			alert("날짜를 선택해 주세요")
		}
		else{
		$("#numm").val($(this).attr("num"));
		pillDelete();
		}
	});
	
	
	$(".searchMedicine").on("click",function() {
		$(".searchbox_rap").show();
	});
	
	$(".memoRegi").on("click",function() {   	  
		drawSelect()
	 
	});
	
	$(document).on("click",".enroll_header_btn1",function() {
		$(".enroll_txt").hide();
	});
	
	$(document).on("click",".enroll_header_btn",function() {
		$("#memo").val($("#memoo").val());
	var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthCalMemo/update",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
				switch(res.msg){
						case "success" :
							makeAlert("알림" , "등록에 성공하였습니다.");
							drawMemo();
							break;
						case "fail" :
							makeAlert("알림" , "등록에 실패하였습니다.");
							break;
						case "error" :
							makeAlert("알림" , "등록 중 문제가 발생하였습니다.");
							break;			
						}
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
		
	});
	
	$("#crud").on("click",function() {
		$(".popupRegister").show();
	});
	$(".close").on("click",function() {
		reloadList2();
		$(".popupRegister").hide();
	});
	
 	$(".bottom_table").on("click", "span", function(){
		$("#page").val("1");
		$("#page").val($(this).attr("page"));
		reloadList();
	});
	
 	$(".page_area").on("click", "span", function(){
		$("#page1").val("1");
		$("#page1").val($(this).attr("page1"));
		reloadList2();
	});
	
		$(".popupRegister").on("click", ".del", function(){
			$(".popup_del").show();
		$("#healthFunFoodNum").val($(this).parent().attr("no"));
			
	});
		$(".backBtn").on("click", function(){
		$(".popup_del").hide();
	});
		$(".delBtn").on("click", function() {
		var params = $("#actionForm1").serialize();
			$.ajax({
				url : "healthInfoDeleteAjax", 
				type : "post", 
				dataType : "json", 
				data : params, 
				success : function(res) { 
					switch(res.msg){
					case "success" :
					$(".popup_del").hide();
					reloadList();
						break;
					case "fail" :
						makeAlert("알림" , "등록에 실패하였습니다.");
						break;
					case "error" :
						makeAlert("알림" , "등록 중 문제가 발생하였습니다.");
						break;			
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText) 
				}
			})
		})
		
		$(document).on("click",".reg", function() {
			
			if($(this).parent().children().children(".AMT").val() == "" || 
				$(this).parent().children().children(".AMT").val() == null){
				$(this).parent().children().children(".AMT").focus();	
						
			}
			else{
				
				$("#takeAmt").val($(this).parent().children().children(".AMT").val());
				$("#numm").val($(this).parent().attr("no"));
				var params = $("#actionForm1").serialize();
				$.ajax({
					url : "healthCalAjax/update", 
					type : "post", 
					dataType : "json", 
					data : params, 
					success : function(res) { 
						switch(res.msg){
						case "success" :
						reloadList();
							break;
						case "fail" :
							makeAlert("알림" , "등록에 실패하였습니다.");
							break;
						case "error" :
							makeAlert("알림" , "등록 중 문제가 발생하였습니다.");
							break;			
						}
					},
					error : function(request, status, error) { 
						console.log(request.responseText) 
					}
				})
			}
		
	});
});

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
					console.log(pill);
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
				    	  $(".time").html("선택된 날짜:" + event.start.format("YYYY-MM-DD"));

				      },
				      dayClick: function(date, js, view) { // 일자 클릭
				    	  $("#Date").val(date.format());
				    	  $(".time").html("선택된 날짜:" + date.format());

				      }
				});
				
					
		},
		error : function(request, status, error) { 
			console.log(request.responseText) 
		}
	})



	
}
function pillDelete(){
   var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthPillAjax/delete",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			switch(res.msg){
			case "success" :
				makeAlert("알림" , "삭제에 성공하였습니다.");
				$('#fullCalendarArea').fullCalendar('destroy')
				reloadCalendar();
				break;
			case "fail" :
				makeAlert("알림" , "해당 날짜에 등록된 약품이 아닙니다.");
				break;
			case "error" :
				makeAlert("알림" , "해당 날짜에 등록된 약품이 아닙니다.");
				break;			
			}
			
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}

function pillInsert(){
   var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthPillAjax/insert",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			switch(res.msg){
			case "success" :
				makeAlert("알림" , "등록에 성공하였습니다.");
				$('#fullCalendarArea').fullCalendar('destroy')
				reloadCalendar();
				break;
			case "fail" :
				makeAlert("알림" , "등록에 실패하였습니다.");
				break;
			case "error" :
				makeAlert("알림" , "등록 중 문제가 발생하였습니다.");
				break;			
			}
			
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function reloadList(){
   var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthCalAjax/select",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawList(res.list);
			
			drawPaging(res.pd);
			
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function reloadList2(){
   var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthCalAjax/select",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			
			drawList2(res.listCal);
			
			drawPaging2(res.pd2);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function drawList(list2){
	var html = "";

	for(var data of list2){
		if(data.ONE_CNT_TAKE_AMT == null || data.ONE_CNT_TAKE_AMT == ""){
			data.ONE_CNT_TAKE_AMT = ""; 

		}
	 	html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td rowspan=\"2\">";
	 	html += "<div><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	 	html += "</td>"; 
	 	html += "<td class=\"co\">" + data.COM_NM + "</td>";
	 	if(data.ONE_CNT_TAKE_AMT == null || data.ONE_CNT_TAKE_AMT == ""){
		 	if(data.SHAPE_NUM ==1){
		 	html += "<td  rowspan=\"2\"><input type=\"number\" class=\"AMT\" placeholder=\"1회 복용량\" value=\""+data.ONE_CNT_TAKE_AMT+"\"  > 개</td>";		
		}
		 	if(data.SHAPE_NUM ==2){
		 	html += "<td  rowspan=\"2\"><input type=\"number\" class=\"AMT\" placeholder=\"1회 복용량\" value=\""+data.ONE_CNT_TAKE_AMT+"\" > 스푼</td>";		
		}
		 	if(data.SHAPE_NUM ==3){
		 	html += "<td  rowspan=\"2\"><input type=\"number\" class=\"AMT\" placeholder=\"1회 복용량\" value=\""+data.ONE_CNT_TAKE_AMT+"\" > ml</td>";		
		}
}	else{
		 	if(data.SHAPE_NUM ==1){
		 	html += "<td  rowspan=\"2\"><input type=\"number\" class=\"AMT\" placeholder=\"1회 복용량\" value=\""+data.ONE_CNT_TAKE_AMT+"\" readonly > 개</td>";		
		}
		 	if(data.SHAPE_NUM ==2){
		 	html += "<td  rowspan=\"2\"><input type=\"number\" class=\"AMT\" placeholder=\"1회 복용량\" value=\""+data.ONE_CNT_TAKE_AMT+"\" readonly > 스푼</td>";		
		}
		 	if(data.SHAPE_NUM ==3){
		 	html += "<td  rowspan=\"2\"><input type=\"number\" class=\"AMT\" placeholder=\"1회 복용량\" value=\""+data.ONE_CNT_TAKE_AMT+"\" readonly > ml</td>";		
		}	
}
	if(data.ONE_CNT_TAKE_AMT == null || data.ONE_CNT_TAKE_AMT == ""){
	 	html += "<td class=\"reg\" rowspan=\"2\" ></td>";	
	 	html += "<td class=\"upd\" rowspan=\"2\" style=\"display: none\"></td>";		
	}else{
	 	html += "<td class=\"reg\" rowspan=\"2\" style=\"display: none\"></td>";	
	 	html += "<td class=\"upd\" rowspan=\"2\"></td>";		
	}
	 	html += "<td class=\"del\" rowspan=\"2\"></td>";
	 	html += "</tr>";
		html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td class=\"name\">" + data.PROD_NM + "</td>";
	 	html += "</tr>";                                               
	}
	$("#rb2").html(html);
}
function drawList2(list){
	var html = "";	
	for(var data of list){
	 	html += "<div class=\"txt_rap\">  ";
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
	 	html += "</div>";	
	 	html += "<div class=\"btn_Wrap\">";
	 	html += "<input amt=\""+data.ONE_CNT_TAKE_AMT+"\" num=\""+data.HEALTH_FUN_FOOD_NUM+"\" type=\"button\"  value=\"등록\"  class=\"pillBtn1 \">";
	 	html += "<input amt=\""+data.ONE_CNT_TAKE_AMT+"\" num=\""+data.HEALTH_FUN_FOOD_NUM+"\" type=\"button\"  value=\"삭제\"  class=\"pillBtn2 \" >";
	 	html += "</div>";
	}	
	$(".start").html(html);
}
/*사용자가 등록한 블럭들 페이징*/
function drawPaging(pd2) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	
	// 이전
	if($("#page").val() == "1"){
	html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	} else{
	html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1) + "\">이전</span>";
	}
	
	for(var i=pd2.startP; i<=pd2.endP; i++){
		if($("#page").val() *1 == i){ // 현재 페이지
			html += "<span class=\"page_btn_on\" page=\"" + i + "\"> " + i + "</span>";
		}else{ // 다른 페이지
			html += "<span class=\"page_btn\" page=\"" + i + "\"> " + i  + "</span>";
		}
	}
	
	if($("#page").val() *1 == pd2.maxP){ // 현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page=\"" + pd2.maxP + "\">다음</span>";		
	}else{
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	}
	
	html += "<span class=\"page_btn page_last\" page=\"" + pd2.maxP + "\">마지막</span>";
	
	$(".bottom_table").html(html);
}

function drawPaging2(pd2) {
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
	
	$(".page_area").html(html);
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
			if(res.list2.length == 0){
				makeAlert("알림" , "해당 날짜에 약품을 먼저 등록해 주세요");
			}else{
			$("#numm").val(res.list2[0].HEALTH_FUN_FOOD_NUM);
			for(data of res.list2){
					html+="<option value=\""+data.HEALTH_FUN_FOOD_NUM+"\">"+ data.PROD_NM+"</option>";
			}
				 $(".selectBox").html(html);
				 drawMemo();
				 
			}
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
					html+="	<div class=\"enroll_header\">";
					html+="	<div class = \"dt_date_pt\">";
					html+="	<Strong class=\"dt_date\">"+res.list.Y_M_D+"</Strong>";
					html+="	</div>";
					html+="	</div>";
					html+="	<div class=\"enroll_btn_rap\">";
					html+="	<div class=\"enroll_header_btn1\">취 소</div>";
					html+="	<div class=\"enroll_header_btn\">등 록</div>";
					html+="	</div>     ";
					html+="	<div class=\"enroll_rap\">";
					html+="	<div class=\"enroll_txt_name\">나의 약품 정보</div>";
					html+="	<div class=\"enroll_txt_id\">메모</div>";
					html+="	<div class=\"enroll_content_info\">약품 이름 :"+res.list.PROD_NM+"" 
					html+= "<br> 회사명:"+res.list.COM_NM+"";
					html+= "<br> 섭취량:"+res.list.TAKE_AMT+"</div>";
					if(res.list.MEMO  == undefined) {
					html+="	<textarea class=\"enroll_content\" id=\"memoo\" placeholder=\"메모를 작성해 주세요\"></textarea>";		
					}
					else{
					html+="	<textarea class=\"enroll_content\" id=\"memoo\">"+res.list.MEMO+"</textarea>";						
					}
					html+="	</div>";		
				$(".memoo").html(html);
				$(".enroll_txt").show();
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
	
	
}
