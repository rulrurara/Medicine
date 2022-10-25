<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<link rel="stylesheet" type="text/css" href="resources/css/register.css" />

<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />

<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/register.js"></script>

<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
	<div class="main_border">
		<h1>회원가입</h1>
		<hr style="border:1px solid #D5D5D5"></hr>
		
		<!-- 아이디 border -->
		<form action="#" id="actionForm" name="actionForm">
		<div class="userid_border border">
			<input type="text" id="userId" name="userId" placeholder="아이디(20자 이하)" maxlength="20"/>
			<input type="button" id="userIdConfimBtn" name="userIdConfirmBtn" class="userIdBtn blueBtn" value="중 복 확 인" />
		</div>
		<span class="idChk" style="color: blue;" >아이디는 20글자 이하</span>
		<div class="userpw_border border">
			<input type="password" id="userPw" name="userPw" placeholder="비밀번호(8~15자 특문 포함)" maxlength="15"/>
		</div>
		<span class="pwChk" style="color: blue;">8자이상(특문포함)</span>
		<div class="userpw_border2 border">
			<input type="password" id="userPwConfirm" name="userPwConfirm" placeholder="비밀번호 확인" maxlength="15"/>
		</div>
		<span class="pwConfirmChk">비밀번호를 확인해주세요.</span>
		<div class="usernm_border border">
			<input type="text" id="userName" name="userName" placeholder="이름 (실명 입력)" maxlength="10" style="width:99%;"/>
		</div>
		<span class="userNameChk">이름을 입력하세요.</span>
		<div class="gender_border">
			<input type="radio" id="genderM" name="gender" class="gender" value="0"/><label for="genderM">남자</label>
			<input type="radio" id="genderW" name="gender" class="gender" value="1"/><label for="genderW" style="margin-left:10px;">여자</label>
		</div>
		<span class="genderChk">성별을 선택해주세요.</span>
		<div class="userbirth_border" style="margin-top:17px;">
			<input type="number" class="year" id="year" name="year" maxlength="4" placeholder="년(4자)" oninput="maxLengthCheck(this)"/>
			<select class="month">
				<option value="" selected>월</option>
				<option value="01">1</option>
				<option value="02">2</option>
				<option value="03">3</option>
				<option value="04">4</option>
				<option value="05">5</option>
				<option value="06">6</option>
				<option value="07">7</option>
				<option value="08">8</option>
				<option value="09">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
			</select>
			<input type="number" class="day" id="day" name="day" maxlength="2" placeholder="일" oninput="maxLengthCheck(this)"/>
		
		</div>
		<span class="userBirthChk"><!-- 생년월일을 제대로 입력해주세요. --></span>
		<div class="phone_border" style="margin-top:17px;">
			<input type="number" id="userPhone" name="userPhone" class="userPhone" placeholder="휴대전화번호('-'제외)" maxlength="11" oninput="maxLengthCheck(this)"/>
		</div>
		<span class="phoneChk">휴대전화 번호를 입력해주세요.</span> 
		<div class="email_border" style="margin-top:17px;">
			<input type="text" id="userEmail" class="userEmail" name="userEmail" placeholder="이메일 주소"/>
			<input type="button" id="emailCertificationBtn" name="emailCertificationBtn" class="emailCertificationBtn blueBtn" value="인 증" />
		</div>
		<span class="successEmailChk">이메일 인증을 해주세요.</span>
		<div class="certification_border" style="margin-top:17px;">
			<input type="number" id="certificationConfirm" name="certificationConfirm" class="certificationConfirm" placeholder="인증번호 입력" maxlength="6" oninput="maxLengthCheck(this)"/>
			<input type="button" id="certificationConfirmBtn" name="certificationConfirmBtn" class="certificationConfirmBtn blueBtn" value="확 인"/>
		</div>
		<span class="successCertChk">인증번호를 입력해주세요.</span>
		<div class="bottom_border border">
			<input type="button" id="newAccountBtn" name="newAccountBtn" class="newAccountBtn blueBtn" value="회 원 가 입" />
			<input type="button" id="cancelBtn" name="cancelBtn" class="cancelBtn grayBtn" value="취 소" />
			<input type="hidden" name="certCode" id="certCode"/>
			<input type="hidden" name="userBirth" id="userBirth" />
			
			<input type="hidden" id="idCheck" value="0" />
			<input type="hidden" id="pwCheck" value="0" />
			<input type="hidden" id="nameCheck" value="0" />
			<input type="hidden" id="genderCheck" value="0" />
			<input type="hidden" id="birthCheck" value="0" />
			<input type="hidden" id="phoneCheck" value="0" />
			<input type="hidden" id="mailCheck" value="0" />
			<input type="hidden" id="certCheck" value="0" />
		</div>
		</form>
	</div>
</body>
</html>