<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>목록</title>
<link rel="stylesheet" type="text/css" href="resources/css/admin/HealthCarePage.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'>
<link rel="stylesheet" href="resources/css/style.css">
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Abhaya+Libre:400,500,600,700,800&display=swap" rel="stylesheet">
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/HealthCarePage.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.2.1/tilt.jquery.min.js'></script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<b class="nav">관리자 홈 > 페이지 관리 > 건강 관리 메인 페이지</b>
		<form action="#" id="actionForm" method="post">
			<input type="hidden" id="no" name="no">
			<input type="button" class="reg btn" id="insertBtn" value="등록">
		</form>
		<div class="container">
			<ul id="ahcp">
			</ul>
		</div>
	</div>
</body>
</html>