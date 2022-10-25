$(document).ready(function() {
	reloadList1();		
	$("tbody").on("click","tr",function(){
		if($(".cate").val() == 0){
		$("#num").val($(this).attr("num"));
		$("#actionForm").attr("action","MediFreeDetail");
		$("#actionForm").submit();	
		}
		if($(".cate").val() == 1){
		$("#no").val($(this).attr("num"));
		$("#actionForm").attr("action","medicineInfoDetail");
		$("#actionForm").submit();	
		}
	});
	

	$(".listBtn").on("click", function() {
		history.back();
	});
	$(".searchbtn").on("click" ,function(){
		$("#page").val("1");
		$("#oldGbn").val($(".searchselect").val());
		$("#oldTxt").val($(".searchtext").val());	
		if($(".cate").val() == 0){
		console.log("ewq")
			reloadList1();		
		}
		if($(".cate").val() == 1){
			reloadList2();		
		}
	})
	$(".paging_area").on("click", "span", function(){
		$(".searchselect").val($("#oldGbn").val());
		$(".searchtext").val($("#oldTxt").val());			
		$("#page").val($(this).attr("page"));
		if($(".cate").val() == 0){
			reloadList1();		
		}
		if($(".cate").val() == 1){
			reloadList2();		
		}
	})
		
	$(".cate").on("change" , function(){
		if($(".cate").val() == 0){
		reloadList1();		
		}
		if($(".cate").val() == 1){
		reloadList2();		
		}
	})
});
function reloadList1(){
   var params = $("#actionForm").serialize();
	$.ajax({
		url : "mypageReple/select1",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawList1(res.list);
			
			drawPaging(res.pd);
			
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function reloadList2(){
   var params = $("#actionForm").serialize();
	$.ajax({
		url : "mypageReple/select2",
		type : "POST", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
			drawList2(res.list);
			drawPaging(res.pd);
			
		},
		error : function(request, status, error){ 
			console.log(request.responseText); 
		} 
	});
}
function drawList1(list){
	var html = "";	
	for(var data of list){
	 	html += "<tr num =\""+data.TXT_NUM+"\"> ";
	 	html += "<td>"+data.REP_NUM+"</td> ";
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

function drawList2(list){
	var html = "";	
	for(var data of list){
	 	html += "<tr num =\""+data.MEDI_NUM+"\"> ";
	 	html += "<td>"+data.REP_NUM+"</td> ";
	 	html += "<td class=\"title\">"+data.CON+"</td> ";
	 	html += "<td>"+data.REG_D+"</td> ";
	 	html += "</tr> ";
	}	
	$("tbody").html(html);
}

	