$(document).ready(function(){
	reloadList();
	$("tbody").on("click","tr",function() {
		$("#num").val($(this).attr("num"));
		$("#revNumber").val($(this).find("td:eq(0)").text());
		$("#actionForm").attr("action","mypageRevUpdate");
		$("#actionForm").submit();	
	});
	$(".listBtn").on("click", function() {
		history.back();
   });
   

	$(".searchbtn").on("click" ,function(){
		$("#page").val("1");
		$("#oldGbn").val($(".searchselect").val());
		$("#oldTxt").val($(".searchtext").val());	
			reloadList();		
	})
	$(".paging_area").on("click", "span", function(){
		$(".searchselect").val($("#oldGbn").val());
		$(".searchtext").val($("#oldTxt").val());			
		$("#page").val($(this).attr("page"));
			reloadList();		
	})
});

function reloadList(){
   var params = $("#actionForm").serialize();
	$.ajax({
		url : "mypageReviewAjax",
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
function drawList(list){
	var html = "";	
	for(var data of list){
	 	html += "<tr num =\""+data.MEDI_NUM+"\">";
	 	html += "<td class=\"revNum\">"+data.REV_NUM+"</td> ";
	 	html += "<td class=\"title\">"+data.CON+"</td> ";
	 	html += "<td>"+data.REG_D+"</td> ";
	 	html += "</tr> ";
	}	
	$("tbody").html(html);
}
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
	
	$(".paging_area").html(html);
}	