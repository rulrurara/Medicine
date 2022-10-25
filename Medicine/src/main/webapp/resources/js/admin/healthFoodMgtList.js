$(document).ready(function() {
	
	$("tbody").on("click",".check",function(){
	  var arr = [];
	  $("#check:checked").each(function(){
	     arr.push($(this).val());
	  })
	  $("#checkdel").val(arr);
	 });
	
	// 삭제 버튼
   	$("#delBtn").on("click",function() {
	    if ($("#delpoPup").css("display") == "block") {
	       $("#delpoPup").hide();
	    } else if ($("#delpoPup").css("display") == "none") {
	       $("#delpoPup").show();
	    }
	 });

	   
	$("#delyes").on("click", function(){
		 var params = $("#actionForm").serialize();
         $.ajax({
        	 url : "HFAction/del",
        	 type : "POST",
        	 dateType : "json",
        	 data : params,
        	 success : function(res){
				console.log(res);
        		 switch (res.msg) {
				case "success":
					location.reload();
					break;
				case "fail":
					alert("알림");
					break;
				case "error" :
					alert("알림");
					break;
				}
        	 },
        	 error : function(request, status , error){
        		 console.log(request.responseText);
        	 }
         })

	});	   
});

		
	
	
	function reloadList(){
		var params = $("#actionForm").serialize();
		
		$.ajax({
			url : "healthFoodListAjax",
			type : "POST",
			dataType : "json",
			data : params,
			success : function(res) {
				drawList(res.list);
				drawList2(res.list2);
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
			html += "<th>";
			html += "<input type=\"checkbox\"class=\"check\" id=\"check\" name=\"checkdel\" value=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
			html += "</th>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">"+ data.HEALTH_FUN_FOOD_NUM +"</td>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\"><div><img class=\"loggo\" src=\"resources/upload/" + data.PROD_PIC + "\"></div></td>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">" + data.PROD_NM + "</td>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">"+ data.COM_NM + "</td>";
			html += "</tr>";
	}
		$(".tl tbody").html(html);
		
}
	function drawList2(list){
		var html ="";
		for(var data of list){
			html += "<tr>";
			html += "<th>";
			html += "<input type=\"checkbox\" class=\"check\" id=\"check\" name=\"checkdel\" value=\"" + data.HEALTH_FUN_FOOD_NUM + "\">";
			html += "</th>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">"+ data.HEALTH_FUN_FOOD_NUM +"</td>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\"><div> <img class=\"loggo\" src=\"resources/upload/" + data.PROD_PIC + "\"></div></td>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">" + data.PROD_NM + "</td>";
			html += "<td no = \"" + data.HEALTH_FUN_FOOD_NUM + "\">"+ data.COM_NM + "</td>";
			html += "</tr>";
	}
		$(".tr tbody").html(html);
		
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