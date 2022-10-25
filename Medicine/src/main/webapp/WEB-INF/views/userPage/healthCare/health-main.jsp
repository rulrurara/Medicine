<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/health-main.css" />

<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/health-main.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script> 
<script type="text/javascript">
//https://saintjamesicedtea.com/
//https://unsplash.com/@tangerinenewt
</script>
<style type="text/css">
</style>
</head>
<body>
<c:import url="/ComImport"></c:import>
<div class="back">
	<div class="one-text">
		<div class="text0">눈이 피로할 땐<br>블루베리</div>
		<div class="text2">안토시아닌이 풍부해서<br>치매 예방에 좋아요</div>
	</div>
	<div class="pic-wrap">
	<div class="pic-all">
		<div class="pic1"><img class="pic1-1" src="resources/upload/${list[0].HEALTH_MAIN_PIC}" ></div>
		<div class="pic2"><img class="pic2-1" src="resources/upload/${list[1].HEALTH_MAIN_PIC}"></div>
		<div class="pic3"><img class="pic3-1" src="resources/upload/${list[2].HEALTH_MAIN_PIC}" ></div>
		<div class="pic4"><img class="pic4-1" src="resources/upload/${list[3].HEALTH_MAIN_PIC}"></div>
	</div>
	</div>
</div>
<div class="main-back">
	<img class="arrow" id="arrow1" src="resources/images/userPage/hc/userPage/left.png">
	<span class="arrow-txt" id="arrow-txt1">키와 몸무게를 입력하고 <br> BMI 지수를 받아보세요.</span>
	<img class="arrow" id="arrow2" src="resources/images/userPage/hc/userPage/up-left.png">
	<span class="arrow-txt" id="arrow-txt2">복용중인 약품을 입력하고<br> 약품 분석을 받아보세요.</span>
	<img class="arrow" id="arrow3" src="resources/images/userPage/hc/userPage/right.png">
	<span class="arrow-txt" id="arrow-txt3">날짜를 클릭하고<br>메모를 작성해 보세요.</span>
	<img class="arrow" id="arrow4" src="resources/images/userPage/hc/userPage/left.png">
	<span class="arrow-txt" id="arrow-txt4">먹는 약품을 등록하고<br>복용한 일자와 복용량을 <br>달력에 기록해 보세요. </span>
	<img class="arrow" id="arrow5" src="resources/images/userPage/hc/userPage/left.png">
	<span class="arrow-txt" id="arrow-txt5">나의 비타민 복용 현황을<br>한눈에 볼 수 있어요. </span>
	<span class="arrow-txt" id="arrow-txt6">BMI, 약품분석, 달력현황 등<br>다른 정보들도 한번에 볼 수 있어요 </span>
	
	
	<div class="main-img1"><img class="picShape" src=resources/images/userPage/hc/userPage/capture-write.png ></div>
	<div class="text-wrap">
	<div class="main-text">나의 정보를 입력하고</div>
	<div class="main-text" style="color: #5561C7 " >약품 분석 및 BMI 지수를 <br> 받아보세요.</div>
	<img class="icon" id="icon1" src="resources/images/userPage/hc/userPage/icon-write.png">
	</div>
	<div class="text-wrap2">
	<div class="main-text">나의 복용 정보를  <br> 달력에 작성하고 </div>
	<div class="main-text" style="color: #D26A51 " >한눈에 나의 복용 이력을  <br> 확인하세요.</div>
	<img class="icon" id="icon2" src="resources/images/userPage/hc/userPage/icon-calendar.png">
	</div>
	<div class="main-img2"><img class="picShape" src=resources/images/userPage/hc/userPage/capture-calendar.png ></div>
	<div class="main-img1"><img class="picShape" src=resources/images/userPage/hc/userPage/capture-report.png ></div>
	<div class="text-wrap">
	<div class="main-text">나의 정보들을 토대로  <br> 지금바로 </div>
	<div class="main-text" style="color: #5d9061" >나의 건강 리포트를 <br>받아보세요 </div>
	<img class="icon" id="icon3" src="resources/images/userPage/hc/userPage/icon-report.png">
	</div>
</div>
</body>
</html>