<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 페이지</title>

<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/postMgt_Free_info.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/postMgt_Free_info.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
<form action="#" id="actionForm" method="post">
	<!-- 전 화면에서 넘어온 페이지 정보 -->
	<input type ="hidden" name="page" value="${param.page}" />
	<!-- 전 화면에서 넘어온 검색 정보 -->
	<input type ="hidden" name="searchGbn" value="${param.searchGbn}" />
	<input type ="hidden" name="searchTxt" value="${param.searchTxt}" />
	
   <input type="hidden" name="no" value="${data.TXT_NUM}">
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
				<p><b>관리자 홈 > 게시물 관리 > 자유게시판 > 상세보기</b><p>
			</div>
			<div class="titlewrap">
				<h1 class="title">${data.TITLE} </h1>
			</div>
			<div class="writerwrap">
				<h1 class="writer">작성자: ${data.NM}</h1>
				<p class="date">${data.REG_D}</p>
				<p class="hit">조회수: ${data.HIT}</p>
			</div>
			<div class="content">${data.CON}</div>
			<div>
			<form action="#" id="actionForm" method="post">
			<input type="button" class="reg btn" id="deleteBtn" value="삭제" />
			</form>
			<form action="#" id="goForm2">
				<input type="button" class="del btn" value="목록" />
					<div class="btn_one"></div>
				</form>
				
			</div>
		</div>
	</div>
</body>
</html>