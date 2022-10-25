<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>목록</title>
<link rel="stylesheet" type="text/css" href="resources/css/admin/MainPage.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/MainPage.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	reloadList();
	$(".brunch").on("click","#pic6",function(){
		$("#impic").val($(this).attr("impic"));
		$("#searchForm").attr("action","mainPageDetail");
		$("#searchForm").submit();
	});
	/* $(".brunch").on("click","#pic0",function(){
		location.href = "mainPageDetail";
	}); */
});
function reloadList(){
	var params = $("#searchForm").serialize();
	$.ajax({
	      url : "mainList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	 	List(res.list);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });	
}
function List(list){
	var html = "";
	html += "<div class=\"icon-left\">"+"</div>";
	html += "<div class=\"icon-right\">"+"</div>";
	html += "<div class=\"pic-first\">"+"</div>";
	/* html += "<div class=\"pic\" id=\"pic0\">"+"</div>"; */
	for(var data of list){
		html += "<div id=\"pic6\" impic=\""+ data.DIET_NUM + "\" class=\"pic\" style=\"background-image:url('resources/upload/"+data.HEADER_PIC+"')\">";
		html += "<div class=\"text\">"+ data.TITLE +"</div>";
		html += "</div>";
	}
	$(".brunch").html(html);
}
</script>
</head>
<body>
	<form action="#" id="searchForm" method="post">
		<input type="hidden" name="impic" id="impic" />
	</form>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<div class="nav">
					<p><b>관리자 홈 > 페이지 관리 > 메인 페이지</b><p>
				</div>
		<div class="brunch-wrap">
			<div class="brunch">
			</div>
		</div>
	</div>
</body>
</html>