$(document).ready(function(){
	
	reloadList2();
	
	var number1 = document.getElementById('cmbox');
    number1.onkeydown = function(e) {
        if(!((e.keyCode > 95 && e.keyCode < 106)
        	|| (e.keyCode > 47 && e.keyCode < 58) 
        	|| e.keyCode == 8)) {
            return false;
        }
    }
    
	var number2 = document.getElementById('kgbox');
    number2.onkeydown = function(e) {
        if(!((e.keyCode > 95 && e.keyCode < 106)
        	|| (e.keyCode > 47 && e.keyCode < 58) 
        	|| e.keyCode == 8)) {
            return false;
        }
    }

	/*키 데이터가 있을 때 img는 수정, img1은 체크*/
	if($("#cmbox").val() != ""){
   		$("#img").show();
		$("#img1").hide();
   		
   		$("#img").click(function(){
	        $("#img").hide();
			$("#img1").show();
    	});
            
	    $("#img1").click(function(){
	        $("#img").show();
			$("#img1").hide();
		});
		
   		var cnt1 = 0;
		$(".editCm").on("click", function(){
			if(cnt1 % 2 == 0){ // 짝수의 경우. 0도 해당
				$("input[name='cmbox']").attr("readonly",false);
				$("input[name='cmbox']").val("");
				$("input[name='cmbox']").focus();
				cnt1++;
			}else{
				$("input[name='cmbox']").attr("readonly",true);
				cnt1++;
			}
		});
	}

	/*키 데이터가 없을 때 img는 수정, img1은 체크*/
	else if($("#cmbox").val("")){
   		$("#img").hide();
		$("#img1").show();
   		
   		$("#img").click(function(){
	        $("#img").hide();
			$("#img1").show();
    	});
            
	    $("#img1").click(function(){
	        $("#img").show();
			$("#img1").hide();
		});
		
   		$("input[name='cmbox']").attr("readonly",false);
   		
   		var cnt = 0;
		$(".editCm").on("click", function(){
			if(cnt % 2 != 0){ // 홀수의 경우
				$("input[name='cmbox']").attr("readonly",false);
				$("input[name='cmbox']").val("");
				$("input[name='cmbox']").focus();
				cnt++;
			}else{
				$("input[name='cmbox']").attr("readonly",true);
				cnt++;
			}
		});
	}
	
	/*몸무게 데이터가 있을 때 img2는 수정, img3은 체크*/
	if($("#kgbox").val() != ""){
   		$("#img2").show();
		$("#img3").hide();
   		
   		$("#img2").click(function(){
	        $("#img2").hide();
			$("#img3").show();
    	});
            
	    $("#img3").click(function(){
	        $("#img2").show();
			$("#img3").hide();
		});
		
   		var cnt3 = 0;
		$(".editKg").on("click", function(){
			if(cnt3 % 2 == 0){ // 짝수의 경우. 0도 해당
				$("input[name='kgbox']").attr("readonly",false);
				$("input[name='kgbox']").val("");
				$("input[name='kgbox']").focus();
				cnt3++;
			}else{
				$("input[name='kgbox']").attr("readonly",true);
				cnt3++;
			}
		});
	}
	
	/*몸무게 데이터가 없을 때 img2는 수정, img3은 체크*/
	else if($("#kgbox").val("")){
	    	$("#img2").hide();
	   		$("#img3").show();
	    	
	    	$("#img2").click(function(){
		        $("#img2").hide();
				$("#img3").show();
		    });
		    
		    $("#img3").click(function(){
		        $("#img2").show();
				$("#img3").hide();
			});
	    	
	    	$("input[name='kgbox']").attr("readonly",false);
	    	
	    	var cnt2 = 0;
			$(".editKg").on("click", function(){
				if(cnt2 % 2 != 0){ // 홀수의 경우
				$("input[name='kgbox']").attr("readonly",false);
				$("input[name='kgbox']").val("");
				$("input[name='kgbox']").focus();
					cnt2++;
				}else{
					$("input[name='kgbox']").attr("readonly",true);
					cnt2++;
				}
			});
	}
	
	/*돋보기*/
	$(".searchimg").on("click", function(){
		$("#page").val("1");
		$("#resultblock1").show();
		$("#bottom_table1").show();
		reloadList1();
 	});
 	
 	/*팝업창 검색창 엔터키*/
	$("#searchbox2").on("keyup",function(key){ 
		if(key.keyCode==13) {            
		$("#page").val("1");
		$("#resultblock1").show();
		$("#bottom_table1").show();
		reloadList1();
		}
	});
 	
 	/*검색했을때 결과블럭들 페이징 눌렀을때*/
 	 $(".bottom_table1").on("click", "span", function(){
		$("#page").val("1");
		// 기존 검색상태 유지
		$("#searchbox1").val($("#oldTxt").val());
		$("#page").val($(this).attr("page"));
		reloadList1();
	});
	
 	/*등록한 블럭들 페이징 눌렀을때*/
 	 $(".bottom_table2").on("click", "span", function(){
		$("#page1").val("1");
		// 기존 검색상태 유지
		$("#page1").val($(this).attr("page1"));
		
		reloadList2();
	});
	
	/* 체크했을때 팝업창 띄우기*/
	$("#resultblock1").on("click", ".check", function(){
		
		$("#healthFunFoodNum").val($(this).parent().attr("no"));
		var params = $("#actionForm1").serialize();
		
		$.ajax({
		url : "healthInfoPopupAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
		$(".popup_search").show();
			popup(res.data);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
		});
	});
	
	/*체크했을때 팝업창에서 취소 버튼*/
	$(".cancelBtn").on("click", function(){
		$(".popup_search").hide();
	});
	
	/*전체 등록 눌렀을 때*/
	$(".enroll").on("click", function() {
		var params = $("#actionForm2").serialize();
		$.ajax({
			url : "healthInfoInsert2Ajax", 
			type : "post", 
			dataType : "json", 
			data : params, 
			success : function(res) { 
				switch(res.msg){
				case "success" :
					alert("등록이 완료되었습니다.");
					break;
				case "fail" :
					alert("알림" , "등록에 실패하였습니다.");
					break;
				case "error" :
					alert("알림" , "등록 중 문제가 발생하였습니다.");
					break;			
				}
				location.href = "MediHealthMain";
			},
			error : function(request, status, error) { 
				console.log(request.responseText) 
			}
		})
	});
		
	//건강기능식품 등록버튼 클릭 시
	$(".enrollBtn").on("click", function() {
		var params = $("#actionForm1").serialize();
			$.ajax({
				url : "healthInfoInsertAjax", 
				type : "post", 
				dataType : "json", 
				data : params, 
				success : function(res) { 
					switch(res.msg){
					case "success" :
						$(".popup_search").hide();
						$("#resultblock2").show();
						reloadList2();
						break;
					case "fail" :
						alert("왜 실패?");
						break;
					case "error" :
						alert("이미 등록하신 제품입니다.");
						$(".popup_search").hide();
						break;			
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText) 
				}
			})
	})
	
	/*삭제아이콘 눌렀을때 팝업창*/
	$("#resultblock2").on("click", ".del", function(){
		$(".popup_del").show();
		$("#healthFunFoodNum").val($(this).parent().attr("no"));
	});

	/*삭제아이콘 팝업창의 삭제하기 버튼을 눌렀을 때*/
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
					$("#resultblock2").show();
					reloadList2();
						break;
					case "fail" :
						alert("알림" , "등록에 실패하였습니다.");
						break;
					case "error" :
						alert("알림" , "등록 중 문제가 발생하였습니다.");
						break;			
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText) 
				}
			})
	})
	
	/*삭제아이콘 팝업창의 뒤로가기 버튼을 눌렀을 때*/
	$(".backBtn").on("click", function(){
		$(".popup_del").hide();
	});
	
});

/*검색했을때 결과블럭들*/
 function reloadList1(){
   var params = $("#actionForm1").serialize();
   
	$.ajax({
		url : "healthInfoAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawList1(res.list);
			drawPaging1(res.pd);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}

/*사용자가 등록한 블럭들*/
 function reloadList2(){
   var params = $("#actionForm1").serialize();
	$.ajax({
		url : "healthInfoAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawList2(res.list2);
			drawPaging2(res.pd2);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}

/*검색했을때 결과블럭들*/
function drawList1(list){
	var html = "";
	for(var data of list){
		
	 	html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td rowspan=\"2\">";
	 	html += "<div><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	 	html += "</td>"; 
	 	html += "<td class=\"co\">" + data.COM_NM + "</td>";
	 	html += "<td class=\"check\" rowspan=\"2\"></td>";
	 	html += "</tr>";
		html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td class=\"name\">" + data.PROD_NM + "</td>";
	 	html += "</tr>";                                               
	}
	$("#rb1").html(html);
}

/*검색했을때 결과블럭들 페이징*/
function drawPaging1(pd) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	
	// 이전
	if($("#page").val() == "1"){
	html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	} else{
	html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1) + "\">이전</span>";
	}
	
	for(var i=pd.startP; i<=pd.endP; i++){
		if($("#page").val() *1 == i){ // 현재 페이지
			html += "<span class=\"page_btn_on\" page=\"" + i + "\"> " + i + "</span>";
		}else{ // 다른 페이지
			html += "<span class=\"page_btn\" page=\"" + i + "\"> " + i  + "</span>";
		}
	}
	
	if($("#page").val() *1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";		
	}else{
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	}
	
	html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	
	$(".bottom_table1").html(html);
}

/*체크버튼 눌렀을 때 팝업창*/
function popup(data){
	var html = "";
	html += "<div class=\"enrollTxt\">" + "내 영양제로 등록하시겠습니까?" + "</div>";
	html += "<div>" + data.HEALTH_FUN_FOOD_NUM + "</div>";
	html += "<div ><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	html += "<div class=\"searchResCo\">" + data.COM_NM + "</div>";
	html += "<div class=\"searchResName\">" + data.PROD_NM + "</div>";
	$(".popup_data").html(html);
}

/*사용자가 등록한 블럭들*/
function drawList2(list2){
	var html = "";
	for(var data of list2){
	 	html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td rowspan=\"2\">";
	 	html += "<div><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	 	html += "</td>"; 
	 	html += "<td class=\"co\">" + data.COM_NM + "</td>";
	 	html += "<td class=\"del\" rowspan=\"2\"></td>";
	 	html += "</tr>";
		html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td class=\"name\">" + data.PROD_NM + "</td>";
	 	html += "</tr>";                                               
	}
	$("#rb2").html(html);
	
	if($("#rb2 tr").length == 0) {
		$("#bottom_table2").hide();
	} else {
		$("#bottom_table2").show();
	}
}

/*사용자가 등록한 블럭들 페이징*/
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
	
	$(".bottom_table2").html(html);
}