
$(document).ready(function(){
var check1 = 0;
var check2 = 0;
	
	//처음에 그리드 숨기기
	$(".compareResBlock").css("display", "none");

   $(".compareTxt").on("click", function(){
		if(check1 == 0 || check2 == 0) {
			alert("비교할 약품을 선택해주세요.");
		} else if(check1 ==1 && check2 == 1){
			if($(".compareResBlock").css("display") == "none") {
				$(".compareResBlock").css("display","grid");
				$(".compareTxt").css("border-bottom-left-radius", "0");
				$(".compareTxt").css("border-bottom-right-radius", "0");
				check1 = 0;
				check2 = 0;
			}	
		}
  });

	$(".compareBtn").on("click", function() {
		if($(this).attr("value") == "1") {
			//alert($(this).attr("value"));
				$("#popup_compare1").show();

		}else if($(this).attr("value") == "2") {
			//alert($(this).attr("value"));
				$("#popup_compare2").show();
			}
	});
	
	/*왼쪽 팝업창 돋보기*/
   $("#popup_compare1 .searchimg").on("click", function(){
		$("#popup_compare1 #page1").val("1");
		
		$("#oldTxt1").val($("#searchbox1").val());
		$("#popup_compare1 .resultblock").show();
		$("#popup_compare1 .bottom_table").show();
		
		reloadList1();
 	});
	
	/*왼쪽 팝업창 검색창 엔터키*/
	$("#searchbox1").on("keyup",function(key){ 
		if(key.keyCode==13) {            
			$("#popup_compare1 #page1").val("1");
			
			$("#oldTxt1").val($("#searchbox1").val());
			$("#popup_compare1 .resultblock").show();
			$("#popup_compare1 .bottom_table").show();
			
			reloadList1();
		}
	});
	
	/*오른쪽 팝업창 돋보기*/
   $("#popup_compare2 .searchimg").on("click", function(){
		$("#popup_compare2 #page2").val("1");

		$("#oldTxt2").val($("#searchbox2").val());
		$("#popup_compare2 .resultblock").show();
		$("#popup_compare2 .bottom_table").show();
		
		reloadList2();
 	});
 	
 	/*오른쪽 팝업창 검색창 엔터키*/
 	$("#searchbox2").on("keyup",function(key){ 
		if(key.keyCode==13) {            
			$("#popup_compare2 #page2").val("1");
	
			$("#oldTxt2").val($("#searchbox2").val());
			$("#popup_compare2 .resultblock").show();
			$("#popup_compare2 .bottom_table").show();
			
			reloadList2();
		}
	});
 	
 	// 페이징부분 왼쪽
 	$("#bottom_table1").on("click", "span", function(){
		// 기존 검색상태 유지
		$("#searchbox1").val($("#oldTxt1").val());
		$("#page1").val($(this).attr("page"));
	
		reloadList1();
	});
	
	// 페이징부분 오른쪽
 	$("#bottom_table2").on("click", "span", function(){
		// 기존 검색상태 유지
		$("#searchbox2").val($("#oldTxt2").val());
		$("#page2").val($(this).attr("page"));

		reloadList2();
	});
	
	// 왼쪽 팝업창
	 $("#resultblock1").on("click", ".check", function(){
		$("#healthFunFoodNum1").val($(this).parent().attr("no"));
		$("#prodPic1").val($(this).parent().attr("pic"));
		$("#resName1").html($(this).parent().attr("prodNm"));
		$("#comNm1").html($(this).parent().attr("comNm"));
		$("#formIcon1").css("background","url(resources/upload/"+$(this).parent().attr("shapePic")+")no-repeat");
		
		var params = $("#actionForm1").serialize();
		$(".popup_search").show();

		$.ajax({
		url : "comparePopupAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			popup(res.data);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
		});
	});
	
	// 오른쪽 팝업창
	$("#resultblock2").on("click", ".check", function(){
		$("#healthFunFoodNum2").val($(this).parent().attr("no"));
		$("#prodPic2").val($(this).parent().attr("pic"));
		$("#resName2").html($(this).parent().attr("prodNm"));
		$("#comNm2").html($(this).parent().attr("comNm"));
		$("#formIcon2").css("background","url(resources/upload/"+$(this).parent().attr("shapePic")+")no-repeat");

		var params = $("#actionForm2").serialize();
		$(".popup_search").show();
		
		$.ajax({
		url : "comparePopupAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			popup(res.data);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
		});
	});
	
	$("#enrollBtn1").on("click", function() {
		$(".popup_search").hide();
		$(".popup_compare").hide();
		$(".resultblock").hide();
		$(".bottom_table").hide();
		
		var params = $("#actionForm1").serialize();

		$.ajax({
		url : "comparePopupAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			resFunc1(res.data2);
			resNut1(res.data3);
			resForm1(res.data4);
			check1 = 1;
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
		});

		toggleImg1();
	});

	$("#enrollBtn2").on("click", function() {
		$(".popup_search").hide();
		$(".popup_compare").hide();
		$(".resultblock").hide();
		$(".bottom_table").hide();
		
		var params = $("#actionForm2").serialize();
		
		$.ajax({
		url : "comparePopupAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			resFunc2(res.data2);
			resNut2(res.data3);
			resForm2(res.data4);
			check2 = 1;
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
		});
		
		toggleImg2();
	});
	
	$(".cancelBtn").on("click", function(){
		$(".popup_search").hide();
	});
	
	$(".close").on("click", function(){
		$(".searchbox").val("");
		$(".popup_compare").hide();
		$(".resultblock").hide();
		$(".popup_search").hide();
		$(".bottom_table").hide();
	});
	
   $(".reCompare").on("click", function(){
	   location.href = "MediCompare";
 	});
 	
});

function reloadList1(){
   var params = $("#actionForm1").serialize();
   
	$.ajax({
		url : "acompareAjax",
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
function reloadList2(){
   var params = $("#actionForm2").serialize();
   
	$.ajax({
		url : "acompareAjax",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawList2(res.list);
			drawPaging2(res.pd);
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}

//왼쪽 resultblock 그리기
function drawList1(list){
	var html = ""; 
	for(var data of list){
	 	html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\" pic=\"" + data.PROD_PIC 
	 	+ "\" prodNm=\"" + data.PROD_NM + "\" shapePic=\"" + data.SHAPE_PIC + "\">";
	 	html += "<td rowspan=\"2\">";
	 	html += "<div><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	 	html += "</td>"; 
	 	html += "<td class=\"co\">" + data.COM_NM + "</td>";
	 	html += "<td class=\"check\" rowspan=\"2\"></td>";

	 	html += "</tr>";
		html += "<tr no=\""+ data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td class=\"name\">" + data.PROD_NM + "</td>";
	 	html += "</tr>";                    
	}
	$("#popup_compare1 tbody").html(html);
}

// 왼쪽 페이징
function drawPaging1(pd) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	
	// 이전
	if($("#page1").val() == "1"){
	html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	} else{
	html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page1").val() * 1 - 1) + "\">이전</span>";
	}
	
	for(var i=pd.startP; i<=pd.endP; i++){
		if($("#page1").val() *1 == i){ // 현재 페이지
			html += "<span class=\"page_btn_on\" page=\"" + i + "\"> " + i + "</span>";
		}else{ // 다른 페이지
			html += "<span class=\"page_btn\" page=\"" + i + "\"> " + i  + "</span>";
		}
	}
	
	if($("#page1").val() *1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";		
	}else{
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page1").val() * 1 + 1) + "\">다음</span>";
	}
	
	html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	
	$("#popup_compare1 .bottom_table").html(html);
}

//오른쪽 resultblock 그리기
function drawList2(list){
	var html = "";
	for(var data of list){
	 	html += "<tr no=\"" + data.HEALTH_FUN_FOOD_NUM + "\" pic=\"" + data.PROD_PIC 
	 	+ "\" prodNm=\"" + data.PROD_NM + "\" shapePic=\"" + data.SHAPE_PIC + "\">";	 	
	 	html += "<td rowspan=\"2\">";
	 	html += "<div><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	 	
	 	html += "</td>"; 
	 	html += "<td class=\"co\">" + data.COM_NM + "</td>";
	 	html += "<td class=\"check\" rowspan=\"2\"></td>";
	 	html += "</tr>";
		html += "<tr no=\""+ data.HEALTH_FUN_FOOD_NUM + "\">";
	 	html += "<td class=\"name\">" + data.PROD_NM + "</td>";
	 	html += "</tr>";                                            
	 	
	}
	$("#popup_compare2 tbody").html(html);
}

// 오른쪽 페이징
function drawPaging2(pd) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	
	// 이전
	if($("#page2").val() == "1"){
	html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	} else{
	html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page2").val() * 1 - 1) + "\">이전</span>";
	}
	
	for(var i=pd.startP; i<=pd.endP; i++){
		if($("#page2").val() *1 == i){ // 현재 페이지
			html += "<span class=\"page_btn_on\" page=\"" + i + "\"> " + i + "</span>";
		}else{ // 다른 페이지
			html += "<span class=\"page_btn\" page=\"" + i + "\"> " + i  + "</span>";
		}
	}
	
	if($("#page2").val() *1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";		
	}else{
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page2").val() * 1 + 1) + "\">다음</span>";
	}
	html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	
	$("#popup_compare2 .bottom_table").html(html);
}

// V버튼 눌렀을때 팝업창
function popup(data){
	var html = "";
	html += "<div class=\"enrollTxt\">" + "비교할 영양제로 등록하시겠습니까?" + "</div>";
	html += "<div><img class=\"searchResImg\" src=\"resources/upload/"+data.PROD_PIC+"\"/></div>";
	html += "<div class=\"searchResCo\">" + data.COM_NM + "</div>";
	html += "<div class=\"searchResName\">" + data.PROD_NM + "</div>";
	$(".popup_data").html(html);
}

// 제형 왼쪽
function resForm1(list){
	var html = "";
	for(var data of list){
		html += "<div id=\"formIcon1\" class=\"formIcon\" style=\"background-position: center; width: 60px; margin: 5px 5px;\"><img src=\"resources/upload/"+data.SHAPE_PIC+"\"/></div>";
	}
	$("#resForm1").html(html);
}

// 제형 오른쪽
function resForm2(list){
	var html = "";
	for(var data of list){
		html += "<div id=\"formIcon2\" class=\"formIcon\" style=\"background-position: center; width: 60px; margin: 5px 5px;\"><img src=\"resources/upload/"+data.SHAPE_PIC+"\"/></div>";
	}
	$("#resForm2").html(html);
}

// 기능성 왼쪽
function resFunc1(list){
	var html = "";
	for(var data of list){
		html += "<div id=\"funcIcon\" class=\"funcIcon\" style=\"background-position: center; margin: 0 30px;\"><img src=\"resources/upload/"+data.PIC+"\"/></div>";
	}
	$("#resFunc1").html(html);
}

// 기능성 오른쪽
function resFunc2(list){
	var html = "";
	for(var data of list){
		html += "<div id=\"funcIcon\" class=\"funcIcon\" style=\"background-position: center; margin: 0 30px;\"><img src=\"resources/upload/"+data.PIC+"\"/></div>";
	}
	$("#resFunc2").html(html);
}

// 영양소 왼쪽
function resNut1(list){ 
	var html = "";
	for(var data of list){
		var cal = data.FIG * 1 ;
		var cal2 = data.MAX_PROP_TAKE_AMT * 1 ;
		var cal3 = data.MIN_PROP_TAKE_AMT * 1 ;
		var cal4 = Math.ceil(cal/cal2 * 70);
		if(cal4>=100){
			cal4 = 100;
		}
		html += "<div class= \"vit_wrap left\">";	
		html += "<div class=\"vit-txt\">" + data.NUT_NM + " "+ data.FIG + data.UNIT + "</div>";
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
		html += "</div>";
	}
	$("#resNutr1").html(html);
}

// 영양소 오른쪽
function resNut2(list){ " + + "
	var html = "";
	for(var data of list){
		var cal = data.FIG * 1 ;
		var cal2 = data.MAX_PROP_TAKE_AMT * 1 ;
		var cal3 = data.MIN_PROP_TAKE_AMT * 1 ;
		var cal4 = Math.ceil(cal/cal2 * 70);
		if(cal4>=100){
			cal4 = 100;
		}
		html += "<div class= \"vit_wrap right\">";	
		html += "<div class=\"vit-txt\">" + data.NUT_NM + " "+ data.FIG + data.UNIT + "</div>";
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
		html += "</div>";
	}
	$("#resNutr2").html(html);
}

/*플러스 버튼에 이미지 넣기*/

function toggleImg1() {
	document.getElementById("img1").src = "resources/upload/"+ $("#prodPic1").val() +"";
	$("#compare1").css("background","white");
	$("#img1").css("width","170px");
	$("#img1").css("margin-top","65px");
	document.getElementById("resName1").src = "resources/upload/"+ $("#prodPic1").val() +"";
}

function toggleImg2() {
	document.getElementById("img2").src = "resources/upload/"+ $("#prodPic2").val() +"";
	$("#compare2").css("background","white");
	$("#img2").css("width","170px");
	$("#img2").css("margin-top","65px");
}