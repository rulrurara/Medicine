<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 페이지</title>

<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/postMgt_FAQ_info.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/postMgt_FAQ_info.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<form action="#" id="actionForm" method="post">
		<!-- 전 화면에서 넘어온 페이지 정보 -->
		<input type ="hidden" name="page" value="${param.page}" />
		<!-- 전 화면에서 넘어온 검색 정보 -->
		<input type ="hidden" name="searchGbn" value="${param.searchGbn}" />
		<input type ="hidden" name="searchTxt" value="${param.searchTxt}" />
		
	   	<input type="hidden" name="no" value="${data.FAQ_NUM}">
	   	<input type="hidden" name="gbnno" id="gbnno" value="${data.GBN_NUM}">
	</form>
	<div class="right_wrap">
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>

		<div id="bottom">
			<div class="nav">
				<p><b>관리자 홈 > 게시물 관리 > FAQ > 상세보기</b><p>
			</div>
			<table class="t">
				<tr>
					<th colspan="2">구분</th>
					<td colspan="6">${data.GBN_NM}</td>
				</tr>
				<tr>
					<th colspan="2">제목</th>
					<td colspan="6">${data.TITLE}</td>
				</tr>
				<tr>
					<th colspan="2">내용</th>
					<td colspan="6" style="height: 400px;">${data.CON}</td>
					</tr>
			</table>
      
			<div>
				<input type="button" class="del btn" id="listBtn" value="목록">
					<div class="btn_one"></div>
				<input type="button" class="reg btn" id="updateBtn" value="수정">
					<div class="btn_one"></div>
			</div>
		</div>
	</div>
</body>
</html>