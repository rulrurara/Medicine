<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>수정 페이지</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/postMgt_Free_info.sujeong.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<script type="text/javascript"src="resources/script/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/postMgt_Free_info.sujeong.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
</head>
<body>
	<div class="bar">
		<div class="wrap">
			<div class="logo2"></div>
			<div class="menu_login_border">
				<div class="menu_userId_border">
					<span class="menu_userId">조영은 주당님 환영합니다.</span> <span
						class="menu_userId2"></span>
				</div>
				<div class="menu_btn_border">
					<input type="button" class="menuLogoutBtn" id="menuLogoutBtn"
						value="로그아웃" /> <input type="button" class="menuLoginBtn"
						id="menuLoginBtn" value="로그인" />
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
	<div class="right_wrap">
<div class="poPup">
			<div class="data">취소하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" value="네"></div>
			</div>
		</div>
		<div class="poPup2">
			<div class="data">등록하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" value="네"></div>
			</div>
		</div>
		<div class="top_header">
			<div class="header">
				<div class="menu"></div>
				<div class="homepage_name">Good Medicine</div>
			</div>
		</div>
		<div id="bottom">
			<div class="nav">
				<p><b>관리자 홈 > 게시물 관리 > 자유게시판 > 수정</b><p>
			</div>
			<table class="t">
				<tr>
					<th colspan="2" style="height: 20px"><input type="text" placeholder="제목 입력해라" style="width:1350px; height: 100%;" />
					
					</th>
				</tr>
				<tr>
					<td colspan="2"><textarea placeholder="내용을 입력하세요." name="nn" id="nn"></textarea></td>
				</tr>
			</table>


			<div>
					<input type="button" class="del btn" value="취소">
						<div class="btn_one"></div>
					<input type="button" class="reg btn" value="등록">
						<div class="btn_one"></div>
			</div>
		</div>
	</div>
</body>
</html>