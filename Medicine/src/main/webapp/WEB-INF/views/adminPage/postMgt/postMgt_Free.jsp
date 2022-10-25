<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>목록</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/postMgt_Free.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/postMgt_Free.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	if("${param.searchGbn}" != ""){ //검색 구분이 넘어오면
		$("#searchGbn").val("${param.searchGbn}");
	}else{
		$("#oldGbn").val("0")
	}
	
reloadList();
//검색 버튼
$("#searchBtn").on("click",function(){
	$("#page").val("1");

	$("#oldGbn").val($("#searchGbn").val());
	$("#oldTxt").val($("#searchTxt").val());

	reloadList();
});
	
	// 상세보기 이동
	$("tbody").on("click", "td", function() {
		$("#no").val($(this).attr("no"));
		//검색 상태 유지
		$("#searchGbn").val($("#oldGbn").val());
		$("#searchTxt").val($("#oldTxt").val());
		
		$("#actionForm").attr("action", "AFreeInfo");
		$("#actionForm").submit();
	});
	// 페이징 버튼
	$(".paging_area").on("click", "span", function(){
		// 기존 검색 상태 유지
			$("#searchGbn").val($("#oldGbn").val());
			$("#searchTxt").val($("#oldTxt").val());
		$("#page").val($(this).attr("page"));
		
		reloadList();
	});
});
</script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
<!-- 기존 검색 내용 유지용 -->
<input type="hidden" id="oldGbn" value="${param.searchGbn}"/>
<input type="hidden" id="oldTxt" value="${param.searchTxt}"/>
	<div class="right_wrap">
	<div class="poPup">
		<div class="data">삭제하시겠습니까?</div>
		<pre class="br"></pre>
		<div class="clickBtn">
			<div><input type="button" class="No" value="아니요"></div>
			<div><input type="button" class="Yes" value="네"></div>
		</div>
	</div>
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
			<div id="bottom">
				<div class="nav">
					<p><b>관리자 홈 > 게시물 관리 > 자유게시판</b><p>
				</div>
				<table class="t">
					<colgroup>
						<!-- 전체 1000 =-->
						<col width="100" />
						<col width="100" />
						<col width="100" />
						<col width="500" />
						<col width="100" />
						<col width="100" />
					</colgroup>
					<thead>
						<tr>
							<th></th>
							<th>게시물 번호</th>
							<th>작성자</th>
							<th>제목</th>
							<th>작성일</th>
							<th>조회수</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
		
			<form action="#" id="actionForm" method="post">
				<input type="hidden" id="no" name="no" /> 
				<input type="hidden" id="page" name="page" value="${page}" />
				<input type="hidden" name="checkdel" id="checkdel" />
			<div class="select_bar">
				
				<select class="select_1" name="searchGbn" id="searchGbn" style="margin-bottom: 8px;">
					<option value="0">제목</option>
					<option value="1">번호</option>
					<option value="2">작성자</option>
				</select> 
				<input type="text" class="text" placeholder="검색하세요." name="searchTxt" id="searchTxt" value="${param.searchTxt}" />
				<input type="button" class="serbtn" value="검색" id="searchBtn">
			<br> <br>
  				<div class="paging_area"></div>
			<div>
				<input type="button" class="del btn" value="삭제">
					<div class="btn_one"></div>
			</div>
			</div>
				</form>
		</div>
	</div>
</body>
</html>