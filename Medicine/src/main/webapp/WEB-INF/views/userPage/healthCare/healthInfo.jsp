<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/healthInfo.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/healthInfo.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>

<div class="total">

		<div id="nameblock" class="blocks">
			<div class="blockTxt" >이름</div>
			<div id="namebar" class="inputbox">
				<div id="nameVal">${sMemNm}</div>
			</div>
		</div>
		<div id="birthblock" class="blocks">
			<div class="blockTxt">생년월일</div>
			<span id="year" class="inputbox">${sMemBirth}</span>
		</div>
		
		<form action="#" id="actionForm2" method="post">
			<input type="hidden" name="memNum" id="memNum" value="${sMemNum}">
			<div id="cmblock" class="blocks">
				<div class="blockTxt">키</div>
				<input type="number" id="cmbox" name="cmbox" class="inputbox" value="${data.HGT}" readonly="readonly">
				<span id="cmtxt">cm</span>
				<div class="editCm" id="editCm" >
					<img id="img" src="resources/images/userPage/ye/editIcon.png" />
					<img id="img1" src="resources/images/userPage/ye/check_icon.png" />
				</div>
			</div>
			<div id="kgblock" class="blocks">
				<div class="blockTxt">몸무게</div>
				<input type="number" id="kgbox" name="kgbox" class="inputbox" value="${data.WGT}" readonly="readonly">
				<span id="kgtxt">kg</span>
				<div class="editKg" id="editKg">
					<img id="img2" src="resources/images/userPage/ye/editIcon.png" />
					<img id="img3" src="resources/images/userPage/ye/check_icon.png" />
				</div>
			</div>
		</form>
		
		<div id="searchblock" class="blocks">
			<div class="blockTxt">건강 기능 식품 검색</div>
			<form action="#" id="actionForm1" method="post">
				<input type="text" style="display:none;"><!-- 엔터키 누르면 페이지 새로고침 방지용 -->
				<input type="text" class="searchbox" id="searchbox2" name="searchbox" value="${param.searchbox}" placeholder="텍스트 입력">
				<input type="hidden" name="healthFunFoodNum" id="healthFunFoodNum" value="${param.healthFunFoodNum}">
				<input type="hidden" name="numm" id="numm">
				<input type="hidden" name="page" id="page" value="${page}">
				<input type="hidden" name="page1" id="page1" value="${page}">
				<input type="hidden" name="memNum" id="memNum" value="${sMemNum}">
			</form>
			<div class="searchimg"></div>
		</div>
	
		<!-- 검색했을때 결과블럭들 -->
		<table class="resultblock" id="resultblock1" style="display:table;">
		 	<colgroup>
		 		<col width="100px;">
		 		<col width="300px;">
		 		<col width="100px;">
		 	</colgroup>
		 	<tbody id="rb1">
		 	</tbody>
 		</table>
 		
		<div class="bottom_table bottom_table1" id="bottom_table1">
  		</div>
  		<div style="height:50px"></div>
 		
 		<!-- 사용자가 등록한 블럭들 -->
		<table class="resultblock" id="resultblock2" style="display:table;">
		 	<colgroup>
		 		<col width="100px;">
		 		<col width="300px;">
		 		<col width="100px;">
		 	</colgroup>
		 	<tbody id="rb2">
		 	</tbody>
 		</table>
		
		<div class="bottom_table bottom_table2" id="bottom_table2">
  		</div>

		<input type="button" value="등록" class="enroll blueBtn">
</div>
	<div style="height:100px"></div>
  		
	<div class="popup_search" id="popup_search">
		<div class="popup_data"></div>
		<div class="cancelBtn"></div>
		<input type="button" value="취소" class="cancelBtn grayBtn">
		<div class="enrollBtn"></div>
		<input type="button" value="등록하기" class="enrollBtn blueBtn">
	</div>
	
	<div class="popup_del" id="popup_del">
		<div class=delTxt>정말 삭제하시겠습니까?</div>
		<div class="backBtn"></div>
		<input type="button" value="돌아가기" class="backBtn grayBtn">
		<div class="delBtn"></div>
		<input type="button" value="삭제하기" class="delBtn blueBtn">
	</div>
	
</body>
</html>