$(document).ready(function(){
	 // 체크된 게시물
	 $("tbody").on("click",".check",function(){
	      var arr = [];
	      $("#check:checked").each(function(){
	         arr.push($(this).val());
			console.log(arr);
	      })
	      $("#checkdel").val(arr);
	     });
	     
	     $(".Yes").on("click", function(){
		 var params = $("#actionForm").serialize();
         $.ajax({
        	 url : "AOAction/del",
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
			url : "AOneListAjax",
			type : "POST",
			dataType : "json",
			data : params,
			success : function(res) {
				drawList(res.list);
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
			html += "<tr no = \"" + data.Q_NUM + "\">";
			html += "<th>";
			html += "<input type=\"checkbox\"class=\"check\" id=\"check\" name=\"checkdel\" value=\"" + data.Q_NUM + "\">";
			html += "</th>";
			html += "<td no = \"" + data.Q_NUM + "\">"+ data.Q_NUM +"</td>";
			html += "<td no = \"" + data.Q_NUM + "\">" + data.TITLE + "</td>";
			html += "<td no = \"" + data.Q_NUM + "\">"+ data.REG_D + "</td>";
			html += "<td no = \"" + data.Q_NUM + "\">"+ data.AON + "</td>";
			html += "</tr>";
	}
		$("tbody").html(html);
		
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