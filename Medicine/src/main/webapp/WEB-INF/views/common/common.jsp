<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

</head>
<body>
<div class="top_header">
<div class="header">
	<div class="menu"></div>
	<div class="logo"></div>
	
	<div class="homepage_name">
		Good Medicine
	</div>

</div>
	
</div>
<div class="bar">
	<div class="wrap">
		<div class="logo2"></div>
		<div class="menu_login_border">
			<div class="menu_userId_border">
				<c:if test="${!empty sMemNm}">
				<span class="menu_userId">${sMemNm}님 환영합니다.</span>
				</c:if>
				<span class="menu_userId2"></span>
			</div>
			<div class="menu_btn_border">
				<c:choose>
					<c:when test="${empty sMemNm}"> 
						<input type="button" class="menuLoginBtn" id="menuLoginBtn" value="로그인" />
						<input type="button" class="menuNewAccount" id="menuNewAccount" value="회원가입" />
					</c:when>
					<c:otherwise>
						<input type="button" class="menuLogoutBtn" id="menuLogoutBtn" value="로그아웃"/>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</div>
	<div class="element">
		<div class="elements medicine_Info">의약품 정보
			<span class="bar_left"></span>
			<span class="bar_right"></span>
		</div>
		<div class="elements health_Mgt">건강 관리
			<span class="bar_left"></span>
			<span class="bar_right"></span>
		</div>
		<div class="elements medicine_Compare">영양제 비교
			<span class="bar_left"></span>
			<span class="bar_right"></span>
		</div>
		<div class="elements freeBoard">자유게시판
			<span class="bar_left"></span>
			<span class="bar_right"></span>
		</div>
		<div class="elements service_center">고객센터
			<span class="bar_left"></span>
			<span class="bar_right"></span>
		</div>
		<div class="elements mypage" >마이페이지
			<span class="bar_left"></span>
			<span class="bar_right"></span>
		</div>
		
	</div>
</div>
</body>
</html>