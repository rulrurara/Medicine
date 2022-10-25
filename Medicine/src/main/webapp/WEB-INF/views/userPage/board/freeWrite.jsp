<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/script/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css"/>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/freeWrite.css"/>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/freeWrite.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<script type="text/javascript">
$(document).ready(function(){
	console.log($("#MemNum").val())
	$(".registerbtn").on("click",function(){
		$("#con").val(CKEDITOR.instances['con'].getData());
		if($.trim($(".titletext").val()) == ""){
			makeAlert("알림", "제목을 입력하세요." , function(){
				$(".titletext").focus();
			});
		} else if($.trim($("#con").val()) == ""){
			makeAlert("알림", "내용을 입력하세요." , function(){
			$("#con").focus();				
			});
		}else{
			var params = $("#actionForm").serialize();
			$.ajax({
				url : "FreeAction/insert", 
				type : "post", 
				dataType : "json", 
				data : params, 
				success : function(res) { 
					switch(res.msg){
					case "success" :
						$("#actionForm").attr("action","MediFreeList");
						$("#actionForm").submit();
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
			});
		}
	});
});
</script>
<body>
<c:import url="/ComImport"></c:import>
<!-- 여기까지 메뉴 -->
<div class="allwrap">
<div class="gnb">자유게시판-글쓰기</div>
<form action="#" id="actionForm">
      <input type="hidden" id="MemNum" name="MemNum" value="${sMemNum}" /> 
     
	<input type="hidden" name="page" id="page" value="${param.page}" />
      <input type="hidden" name="searchGbn" id="searchGbn" value="${param.searchGbn}" />
      <input type="hidden" name="searchTxt" id= "searchTxt" value="${param.searchTxt}" /> 
	<div class="titlewrap">
		<input type="text" class="titletext" placeholder="게시글 제목을 입력하세요!" name="title">
	</div>
	<input type="text" id="con" name="con">
	<div class="btnwrap">
		<input type="button" class="registerbtn" value="등록">
		<input type="button" class="cancelbtn" value="취소">
	</div>
</form>
</div>
</body>
</html>