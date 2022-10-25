<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/script/fullcalendar/fullcalendar.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/healthCare_takeCal.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css"	href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<!-- Moment Script -->
<script type="text/javascript" src="resources/script/jquery/moment.js"></script>
<script type="text/javascript" src="resources/script/fullcalendar/fullcalendar.js"></script>
<script type="text/javascript" src="resources/script/fullcalendar/locale-all.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/healthCare_takeCal.js"></script>

<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
<div class="bigrap">
	<div class="wrap_rap">
		
		<div class="enroll_txt">
			<div class="header_sele">
				<select class="selectBox" name="selectBox">
				</select>
			</div>
			<div class="memoo">
				<div class="enroll_header">
					<div class = "dt_date_pt">
				<Strong class="dt_date"></Strong>
					</div>
				</div>
				<div class="enroll_btn_rap">
				<div class="enroll_header_btn1">취 소</div>
				<div class="enroll_header_btn">등 록</div>
				</div>
				<div class="enroll_rap">
					<div class="enroll_txt_name">나의 약품 정보</div>
					<div class="enroll_txt_id">메모</div>
					<div class="enroll_content_info"></div>
					<textarea class="enroll_content"></textarea>
				</div>
			</div>	
		</div>
		<div id="fullCalendarArea"></div>
	</div>
	<div class="dt">
		<p style="font-size: 15px; text-align: center;">내 정보 입력하기에서 약품을 등록하고</p>
		<div class = "searchMedicine" id="goInfo">내 정보 입력하러 가기</div>
		<p style="font-size: 15px;text-align: center;">달력에 맞게 등록,수정 하세요</p>
		<div class = "searchMedicine" id="crud">약품 등록,수정,삭제</div>
		<div class ="time">선택된 날짜: 없음.</div>
		<div class ="memo"><input type="button" class="memoRegi" value="메모 등록하기"></div>
		<div class="start"> 
		</div>
		<div class="page_area">
		</div>
	</div>
</div>
<div class="popupRegister">
	<div class="close"></div>
		<table class="resultblock">
		 	<colgroup>
		 		<col width="150px;">
		 		<col width="250px;">
		 		<col width="200px;">
		 		<col width="60px;">
		 		<col width="60px;">
		 	</colgroup>
		 	<tbody id="rb2">
		 	
		 	</tbody>
 		</table>	
		<div class="bottom_table">
  		</div>
</div>
	<div class="popup_del" id="popup_del">
		<div class=delTxt>정말 삭제하시겠습니까?</div>
		<div class="backBtn"></div>
		<input type="button" value="돌아가기" class="backBtn grayBtn">
		<div class="delBtn"></div>
		<input type="button" value="삭제하기" class="delBtn blueBtn">
	</div>
<form action="#" id="actionForm1" >
	
	<input type="hidden" name="Date" id="Date">
	<input type="hidden" name="takeAmt" id="takeAmt">
	<input type="hidden" name="numm" id="numm">
	<input type="hidden" name="healthFunFoodNum" id="healthFunFoodNum">
	<input type="hidden" name="page" id="page" value="${page}">
	<input type="hidden" name="page1" id="page1" value="${page1}">
	<input type="hidden" name="memNum" id="memNum" value="${sMemNum}">
	<input type="hidden" name="select" id="select" value="1">
	<input type="hidden" name="memo" id="memo" >
</form>
</body>
</html>