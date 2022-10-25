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
	<input type="hidden" name="AmemNo" id="AmemNo" value="${sMemNum}">
	<input type="hidden" name="AmemCo" id="AmemCo" value="${sMemCode}">
	<div class="bar">
		<div class="wrap">
			<div class="logo2"></div>
			<div class="menu_login_border">
				<div class="menu_userId_border">
					<span class="menu_userId2">${sMemNm}님 안녕!</span>
				</div>
				<div class="menu_btn_border">
					<input type="button" class="menuLogoutBtn" id="menuLogoutBtn" value="로그아웃" />
				</div>
			</div>
		</div>
	<div class="element">
         <div class="elements elements_member">회원 관리</div>
         <div class="elements elements_med">의약품 관리</div>
         <div class="elements elements_healthFood">건강 기능 식품 관리</div>
         <div id="dropdown1" class="elements">게시물 관리
               <div class="dropdown-content">
                  <div class="drop-elements dropdown_board">자유게시판</div>
                  <div class="drop-elements dropdown_mgt">고객센터 1대1 문의</div>
                  <div class="drop-elements dropdown_faq">고객센터 FAQ</div>
               </div>
         </div>
         <div id="dropdown" class="hel-elements">건강 관리
               <div class="dropdown-content">
                  <div class="drop-elements elements_main">메인페이지 관리</div>
                  <div class="drop-elements elements_healthCare">건강관리 페이지 관리</div>
               </div>
            </div>
    </div>
	</div>
	
</body>
</html>