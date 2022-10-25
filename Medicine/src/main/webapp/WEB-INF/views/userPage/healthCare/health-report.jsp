<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- Moment Script,calendar -->
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/health-report.js"></script>

<script type="text/javascript" src="resources/script/jquery/moment.js"></script>
<script type="text/javascript" src="resources/script/fullcalendar/fullcalendar.js"></script>
<script type="text/javascript" src="resources/script/fullcalendar/locale-all.js"></script>
<!-- chart -->
<script src="resources/js/highchart/highcharts.js"></script>
<script src="resources/js/highchart/exporting.js"></script>
<script src="resources/js/highchart/export-data.js"></script>
<script src="resources/js/highchart/accessibility.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script> 

<!-- css -->
<link rel="stylesheet" type="text/css" href="resources/css/userPage/calendar.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/bmi.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/vit.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/drug.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/health-report.css" />
<link rel="stylesheet" type="text/css" href="resources/script/fullcalendar/fullcalendar.css" />
</head>
<style>

</style>
<body>
<!-- 메뉴 -->
<c:import url="/ComImport"></c:import>
<!-- calendar -->

<div class="bigrap">
   <div class="calendarIcon"></div>
   <div class="nutrTxt">${sMemNm} 님의 영양제 섭취일지입니다.</div>
	<div class="wrap_rap">
		<div id="fullCalendarArea"></div>
	</div>
	<div class="dt">
		<div class="txt_rap">
		</div>
		<div class="btn_rap">
		</div>
		<div class="btnWrap">
			<input type="button" class="registerBtn" value="섭취일지 작성하기">
		</div>
	</div>
	<div class="memowrap">
		<select class="selectbox">
		</select>
		<table class="table1">
		</table>
	</div>
</div>
<form action="#" id="actionForm1" >
	<input type="hidden" name="Date" id="Date">
	<input type="hidden" name="numm" id="numm">
	<input type="hidden" name="page1" id="page1" value="1">
	<input type="hidden" name="memNum" id="memNum" value="${sMemNum}">
</form>
<!-- vit -->
<div class="total">

   <div class="analysisIcon"></div>

   <div class="nutrTxt">${sMemNm} 님의 영양상태 분석입니다.</div>
   
      		<div class="wrap10">
			<div class="inline">
				<div class="explain1" id="lack1"></div>
				<div class="explain2" >부족 섭취</div>
			</div>
			<div class="inline">
				<div class="explain1" id="opt1"></div>
				<div class="explain2" >적정 섭취</div>
			</div>
			<div class="inline">
				<div class="explain1" id="exc1"></div>
				<div class="explain2" >과다 섭취</div>
			</div>
		</div>

   <div id="essential" class="nutrHead">
      <div class="subHeadTxt" id="subHeadTxt1">필수 영양소</div>
      <div class="questionIcon" id="questionIcon1"></div>
   </div>
   

      
   <div class="popup" id="popup1">
      <h2>필수 영양소란?</h2><br>
      인체의 정상적인 기능 유지에 필수적 이나 우리 몸에서 합성되지 않아 섭취가 필요한 영양소로, <br>
      한국인 영양소 섭취현황, 한국 영양학회 자료 등을 종합하여 선정한 필수 섭취 영양소 입니다.
      <div class="deleteIcon"></div>
   </div>
   
 	<div class="vitdiv" id="vitdiv0">

		<div class="wrap1">
			<div class="eat1">현재 섭취량</div>
			<div class="eat2">적정 섭취량</div>
		</div>	
	</div>
	<div class="vitdivEssen"></div>
 
   <div class="line"></div>
    
   <div id="functional" class="nutrHead">
      <div class="subHeadTxt" id="subHeadTxt2">기능성 영양소</div>
      <div class="questionIcon" id="questionIcon2"></div>
   </div> 

   <div class="popup" id="popup2">
      <h2>기능성 영양소란?</h2><br>
      현재 섭취 중인 영양제에 포함된 성분 중 섭취 목적에 해당하는 기능성 영양소입니다. <br>
      해당 영양소는 식약처에서 생리활성기능을 인정받아 고시된 성분입니다.
      <div class="deleteIcon"></div>
   </div>
     <div class="vitdiv" id="vitdiv1">
		<div class="wrap1">
			<div class="eat1">현재 섭취량</div>
			<div class="eat2">적정 섭취량</div>
		</div>	
	</div>
	<div class="vitdivFunc"></div>
	<div style="height:50px"></div>
</div>

<!-- drug -->
<div class="allWrap">
		<table class="drug-table">
				<tr>
					<th style="width:10%;"><img src="resources/images/userPage/ye/subsIcon.png"></th>
					<th colspan="4" style="font-size: 28px;height: 100px;text-align: left; line-height:100px; ">
					${sMemNm}님의 섭취 제품 분석입니다.
					</th>
				</tr>
		</table>
	<div class="pic-all"></div>
</div>
<!--  BMI -->
<div class="wrapp">

	<table class="BMI-table">
		<tr>
			<th style="width:10%;"><img src="resources/images/userPage/ye/bmiIcon.png"></th>
			<th colspan="3" style="font-size: 28px;height: 100px;text-align: left; line-height:100px; width:90%;">
			${sMemNm}님의 BMI 그래프입니다.
			</th>
		</tr>
		<tr>
			<th rowspan="4" colspan="2"  style="background-color: #ffffff">
				    <div id="container"></div>
			</th>
			<th>신체정보</th>
			<th>비만도 결과</th>
		</tr>
		<tr>
			<td>키: ${data.HGT}cm <br>몸무게 : ${data.WGT}kg <br> 나이:${data.AGE}세 </td>
			<td>체질량 지수:${data.BMI}<br> 
						
					<c:choose>
						<c:when test="${  data.BMI le 18.5 }">
							결과 : 저체중
						</c:when>
						<c:when test="${ 18.6 le data.BMI and data.BMI le 22.9 }">
							결과 : 정상체중
						</c:when>
						<c:when test="${ 23 le data.BMI and data.BMI le 24.9 }">
							결과 : 과체중
						</c:when>
						<c:otherwise>
							결과 : 비만
						</c:otherwise>
					</c:choose>		
			</td>
		</tr>
		<tr>
			<th colspan="2">권장사항</th>
		</tr>
		<tr>
			<td colspan="2">
				<c:choose>
					<c:when test="${  data.BMI le 18.5 }">
						탄수화물(고구마, 감자), 단백질을 많이 드시고 운동하세요
					</c:when>
					<c:when test="${ 18.6 le data.BMI and data.BMI le 22.9 }">
						건강한 식단을 유지하세요
					</c:when>
					<c:when test="${ 23 le data.BMI and data.BMI le 24.9 }">
						아침을 꼭 드시고 운동 하세요
					</c:when>
					<c:otherwise>
						식단관리와 운동하세요
					</c:otherwise>
				</c:choose>	
			</td>
		</tr>
	</table>
	<div class="btnwrap">
		<input type="button" class="dayBtn" value="일별 그래프">
		<input type="button" class="monthBtn" value="월별 그래프">
		<input type="button" class="reviseBtn" value="키 ,몸무게 수정하기" >
	</div>
</div>
<div style="height:80px"></div>
</body>
</html>