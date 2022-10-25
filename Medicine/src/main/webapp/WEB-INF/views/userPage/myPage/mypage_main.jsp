<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css"/>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mypage_main.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/mypage_main.js"></script>
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
	<div class="gnb">마이페이지 - 회원정보 수정</div>
	<div class="main_border">
		<div class="top_name_border">회원수정</div>
		<hr></hr>
	<div class="top_border">
		<div class="name_border">
			<span style="margin-top:25px;">이름 :</span><br/>
			<span style="margin-top:24px;">아이디 :</span><br/>
			<span style="margin-top:24px;">비밀번호 :</span><br/>
			<span style="margin-top:24px;">전화번호 :</span><br/>
			<span style="margin-top:27px;">이메일 :</span><br/>
		</div>
		<div class="input_border">
			<input type="text" readonly="readonly" value="${sMemNm}" />
			<input type="text" readonly="readonly" value="${sMemId}" />
			<input type="password" readonly="readonly" value="${sMemPw}" />
			<input type="text" readonly="readonly" value="${sMemPhone}" id="phoneList" />
			<input type="text" readonly="readonly" value="${sMemEmail}" id="emailList" />
		</div>
		<div class="button_border">
			<input type="button" class="pwUpdateBtn blueBtn" value="수 정"/>
			<input type="button" class="phoneUpdateBtn blueBtn" value="수 정" style="margin-top:15px;"/>
			<input type="button" class="emailUpdateBtn blueBtn" value="수 정" style="margin-top:12px;"/>
		</div>
	</div>
	
		<div class="middle_border">
			<input type="button" class="mypageBtn blueBtn" id="myAnswer" value="나의 1:1 문의"/>
			<input type="button" class="mypageBtn blueBtn" id="myReview" value="나의 리뷰"/>
			<input type="button" class="mypageBtn blueBtn" id="myPost" value="나의 게시글"/>
			<input type="button" class="mypageBtn blueBtn" id="myComment" value="나의 댓글"/>
		</div>
		
		<div class="bottom_border">
			<div class="bottom_btn_border">
				<input type="button" class="leaveBtn grayBtn" id="leaveBtn" value="회 원 탈 퇴"/>
				<input type="button" class="listBtn blueBtn" id="listBtn" value="목 록" />
			</div>
		</div>
	</div><!-- end of main_border -->
	<!-- 비밀번호 수정 팝업창 -->
	<form action="#" id="pwcheckForm" method="post">
	<input type="hidden" name="Memnum" value="${sMemNum}">
	<div class="popup_border_pw">
		<div class="popup_top_pw">비밀번호 수정</div>
		<hr></hr>
		<div class="border_pw">
			<div class="border_currentpw border_left_pw">
				<input type="password" name="today_pw" id="today_pw" class="input_pw" placeholder="현재 비밀번호" maxlength="15"/>
				<br/>
				<span id="tdpw" class="exception_pw"></span>
			</div>
			<div class="border_changepw border_left_pw">
				<input type="password" name="main_pw" id="input_pw" class="input_password" placeholder="변경할 비밀번호(8~15자 특문 포함)" maxlength="15"/>
				<br/>
				<span id="pwchk" class="exception_pw"></span>
			</div>
			<div class="border_confirmpw border_left_pw">
				<input type="password" name="main_pw2" id="input_pw2" class="input_password" placeholder="비밀번호 확인" maxlength="15"/>
				<br/>
				<span id="checkpw"  class="exception_pw"></span>
			</div>
		</div>
		
		<div class="popup_bottom_pw">
			<input type="button" class="editCompleteBtn blueBtn" value="수 정 완 료"/>
			<input type="button" class="cancelPwBtn grayBtn" id="cancelPwBtn" value="취 소"/>
		</div>
	</div>
	</form>
	<form action="#" id="PhoneForm" method="post">
	<input type="hidden" name="Memnum" value="${sMemNum}">
	<!-- 전화번호 수정 팝업창 -->
	<div class="popup_border_phone">
		<div class="popup_top_phone">전화번호 수정</div>
		<hr></hr>
		
		<!-- 휴대폰 이미지 -->
		<div class="left_border_phone"></div>
		<div class="border_phone">
		<!-- text -->
		<div class="border_left_phone current_phone">
			<input type="text" class="input_phone phone1" value="${sMemPhone}" readonly="readonly"/>
			<br/>
			<span class="exception_phone"></span>
		</div>
		<div class="border_left_phone" >
			<input type="text" id="change_phone_check" class="input_phone phone2" placeholder="변경할 전화번호('-'제외)" maxlength="11"/>
			<br/>
			<span class="exception_phone phone_check" id="phone_check" ></span>
		</div>
		<div class="border_left_phone" >
			<input type="text" id="change_phone" name="change_phone" class="input_phone phone3" placeholder="변경할 전화번호('-'제외) 확인"/>
			<br/>
			<span class="exception_phone phone_check2" id="phone_check2"></span>
		</div>
		</div>
		
		<div class="popup_bottom_phone">
			<input type="button" class="changePhoneBtn blueBtn" value="변 경 하 기"/>
			<input type="button" class="cancelPhoneBtn grayBtn" id="cancelPhoneBtn" value="취 소"/>
		</div>
	</div>
	</form>
	<form action="#" id="actionForm" name="actionForm">
	<input type="hidden" name="Memnum" value="${sMemNum}">
	<!-- 이메일 수정 팝업창 -->
	<div class="popup_border_email">
		<div class="popup_top_email">이메일 수정</div>
		<hr></hr>
		
		<!-- 이메일 이미지 -->
		<div class="left_border_email"></div>
		<div class="border_email">
		<!-- text -->
		<div class="border_left_email current_email">
			<input type="text" class="input_email email1" value="${sMemEmail}" readonly="readonly"/>
			<br/>
			<span class="exception_email"></span>
		</div>
		<div class="border_left_email">
			<input type="text" id="user_Email" name="user_Email" class="input_email email2" placeholder="변경할 이메일주소" />
			<br/>
			<span class="exception_email"></span>
		</div>
		<div class="border_left_email">
			<input type="text" class="input_email email3" placeholder="변경할 이메일주소 확인" />
			<input type="button" class="certificationBtn blueBtn" value="인 증"/>
			<br/>
			<span class="exception_email" id="exception_email_check"></span>
		</div>
		<div class="border_left_email">
			<input type="number" id="certificationConfirm" name="certificationConfirm" class="input_email email4 certificationConfirm" placeholder="인증번호 입력" maxlength="6" oninput="maxLengthCheck(this)" />
			<input type="button" class="certificationBtn2 blueBtn" value="확 인"/>
			<br/>
			<span class="exception_email" id="successCertChk"></span>
		</div>
		</div>
		
		<div class="popup_bottom_email">
			<input type="button" class="changeEmailBtn blueBtn" value="변 경 하 기"/>
			<input type="button" class="cancelEmailBtn grayBtn" id="cancelEmailBtn" value="취 소"/>
			<input type="hidden" id="mailCheck" value="0" />
			<input type="hidden" name="certCode" id="certCode"/>
		</div>
	</div>
	</form>
	<!-- 회원탈퇴 팝업창 -->
	<div>
	<div class="popup_border_leave">
		<div class="popup_top_leave">회원 탈퇴</div>
		<hr></hr>
		<div class="popup_middle_leave">탈퇴 하시겠습니까?</div>
		<div class="popup_bottom_leave">
			<input type="button" class="yesBtn grayBtn" id="yesBtn" value="예"/>
			<input type="button" class="noBtn blueBtn" id="noBtn" value="아니요"/>
		</div>
	</div>
	</div>
</body>
</html>