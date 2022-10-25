$(document).ready(function() {
		// 목록 조회
		reloadList();
		
	// 페이징 버튼
	$(".paging_area").on("click", "span", function(){
		$("#page").val($(this).attr("page"));
		
		reloadList();
	});  

});
	
	function reloadList(){
		var params = $("#actionForm").serialize();
		
		$.ajax({
			url : "healthFoodInfoListAjax",
			type : "POST",
			dataType : "json",
			data : params,
			success : function(res) {
				drawList(res.list);
				drawList2(res.list2);
				drawList1(res.list1);
				drawPaging(res.pd);
			},
			error : function(request, status, error) {
				console.log(request.responseText);
			}
		});
	};
	function drawList(list){
		var html ="";
		for(var data of list){
				html += "<tr no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">";
			    html += "<td><div><img class=\"imm\" src=\"resources/upload/" + data.PIC + "\"></div></td>";
			    html += "<td>" + data.FUNC_NM + "</td>";
			  	html += "</tr>";
	}
		$("#memDiv").html(html);
		
}

	function drawList2(list2){
		var html ="";
		for(var data of list2){
				html += "<tr no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">";
			    html += "<td><div><img class=\"imm\" src=\"resources/upload/" + data.SHAPE_PIC + "\"></div></td>";
			    html += "<td>" + data.SHAPE_NM + "</td>";
			  	html += "</tr>";
			  
	}
		$("#memDiv2").html(html);
		
}

	function drawList1(list1){
		var html ="";
		for(var data of list1){
				html += "<tr no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">";
			    html += "<td>" + data.NUT_NM + "</td>";
			    html += "<td>" + data.FIG + "" + data.UNIT + "</td>";
			  	html += "</tr>";
	}
		$("#memDiv1").html(html);
		
}
function drawPaging(pd){
		var html = "";

		   html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
		   // 이전
		   if($("#page").val() == "1"){
		   		html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
		   }else{
		   		html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 -1) + "\">이전</span>";			   
		   }
		   
		   for(var i = pd.startP; i <= pd.endP; i++){
			   if($("#page").val() * 1 == i){ // 현재 페이지
		   			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
			   }else{ // 다른페이지
		   			html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
			   }
		   }
		   
		   if($("#page").val() * 1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면..
		   		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";			   
		   }else{
		   		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";			   			   
		   }
		   
		   html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
		   
		   $(".paging_area").html(html);
	}