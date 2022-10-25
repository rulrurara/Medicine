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
<link rel="stylesheet" type="text/css" href="resources/css/userPage/compare.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/compare.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery-ui.js"></script>
</head>

<body>
<c:import url="/ComImport"></c:import>

<div class="total">
	<div class="headTxt">관심있는 영양제의 기능성, 함량 등을 확인해보세요</div>
	<div class="headImg"></div>
	<!-- 왼쪽 플러스 버튼 -->
	<div class="compare" id="compare1">
		<div class="compareBtn1 compareBtn" value="1">
			<img id = "img1" src="resources/images/userPage/ye/compareEnroll.png" />
		</div>
	</div>
	<!-- 오른쪽 플러스 버튼 -->
	<div class="compare" id="compare2">
		<div class="compareBtn2 compareBtn" value="2">	
			<img id = "img2" src="resources/images/userPage/ye/compareEnroll.png" />
		</div>
	</div>
	<div class="compareTxt">비교하기</div>
	
<!-- 등록 팝업창 왼쪽 -------------------------------------------------->
	
	<div class="popup_compare" id="popup_compare1" style="display: none;">
		<div class="popup_txt">궁금하신 영양제의 <br> 브랜드명 또는 업체명을 <br> 입력해주세요.</div>
		<div class="close" id="close1"></div>
		<div class="searchimg"></div>
		<input type="hidden" id="oldTxt1"> <!-- 기존 검색 내용 유지용 -->
		<form action="#" id="actionForm1" method="post">
			<input type="text" style="display:none;"> <!-- 엔터키 누르면 페이지 새로고침 방지용 -->
			<input type="text" class="searchbox" id="searchbox1" name="searchbox" placeholder="텍스트 입력">
			<input type="hidden" name="healthFunFoodNum" id="healthFunFoodNum1">
			<input type="hidden" name="prodPic" id="prodPic1">
			<input type="hidden" name="comNm" id="comNm1">
			<input type="hidden" name="page" id="page1" value="${page}">
		</form>
		
		<table class="resultblock" id="resultblock1" style="display:table;">
		 	<colgroup>
		 		<col width="100px;">
		 		<col width="300px;">
		 		<col width="100px;">
		 	</colgroup>
		 	<tbody>
		 	</tbody>
 		</table>
 		
		<div class="bottom_table" id="bottom_table1">
  		</div>
  		<div style="height:100px"></div>
			
		<!-- V버튼 눌렀을때 팝업창	 -->
		<div class="popup_search" id="popup_search1">
			<div class="popup_data">
			</div>
			<div class="cancelBtn"></div>
			<input type="button" value="취소" class="cancelBtn grayBtn">
			<div class="enrollBtn"></div>
			<input type="button" value="등록하기" class="enrollBtn blueBtn" id="enrollBtn1" onclick="toggleImg1()">
		</div>
	</div>
	
<!-- 등록 팝업창 오른쪽 -------------------------------------------------->
	
	<div class="popup_compare" id="popup_compare2" style="display: none;">
		<div class="popup_txt">궁금하신 영양제의 <br> 브랜드명 또는 제품명을 <br> 입력해주세요.</div>
		<div class="close" id="close2"></div>
		<div class="searchimg"></div>
		<input type="hidden" id="oldTxt2"> <!-- 기존 검색 내용 유지용 -->
		<form action="#" id="actionForm2" method="post">
			<input type="text" style="display:none;"><!-- 엔터키 누르면 페이지 새로고침 방지용 -->
			<input type="text" class="searchbox" id="searchbox2" name="searchbox" placeholder="텍스트 입력">
			<input type="hidden" name="healthFunFoodNum" id="healthFunFoodNum2">
			<input type="hidden" name="prodPic" id="prodPic2">
			<input type="hidden" name="comNm" id="comNm2">
			<input type="hidden" name="page" id="page2" value="${page}">
		</form>
		
		<table class="resultblock" id="resultblock2" style="display:table;">
		 	<colgroup>
		 		<col width="100px;">
		 		<col width="300px;">
		 		<col width="100px;">
		 	</colgroup>
		 	<tbody>
		 	</tbody>
 		</table>
		
		<div class="bottom_table" id="bottom_table2">
  		</div>
  		<div style="height:100px"></div>

			<!-- V버튼 눌렀을때 팝업창	 -->
		<div class="popup_search" id="popup_search2">
			<div class="popup_data">
			</div>
			<div class="cancelBtn"></div>
			<input type="button" value="취소" class="cancelBtn grayBtn">
			<div class="enrollBtn"></div>
			<input type="button" value="등록하기" class="enrollBtn blueBtn" id="enrollBtn2" onclick="toggleImg2()">
		</div>
	</div>
	
	<!-- ------------------------ -->
	
	<div class="compareResBlock" style="display: grid;grid-template-columns: 182px 232px 134px 134px 232px 182px;align-content: center;">
	
		<div id="resName1" class="resName" style="grid-column: 1 / span 3; height: 80px; line-height: 80px;"></div>
		<div id="resName2" class="resName" style="grid-column: 4 / span 3;height: 80px;line-height: 80px;"></div>

		<div id="resForm1" class="resForm" style="grid-column: 1 / span 2;display: flex;justify-content: center;"></div>
		<div id="resFormTxt" class="resFormTxt" style="grid-column: 3 / span 2;">제형</div>	
		<div id="resForm2" class="resForm" style="grid-column: 5 / span 2;display: flex;justify-content: center;"></div>
		
		<div id="resFunc1" class="resFunc" style="grid-column: 1 / span 2;"></div>
		<div id="resFuncTxt" class="resFuncTxt" style="grid-column: 3 / span 2;">기능성</div>	
		<div id="resFunc2" class="resFunc" style="grid-column: 5 / span 2;"></div>
		
		<!-- 왼쪽 영양소 -->
		<div id="resNutr1" class="resNutr" style="grid-column: 1 / span 2;"></div>
		<div id="resNutrTxt" class="resNutrTxt" style="grid-column: 3 / span 2;">영양소</div>	
			
		<!-- 오른쪽 영양소 -->	
		<div id="resNutr2" class="resNutr" style="grid-column: 5 / span 2;"></div>
		<input type="button" value="다시 비교하기" class="reCompare blueBtn">
	</div>
</div>
		<div style="height:100px"></div>
</body>
</html>