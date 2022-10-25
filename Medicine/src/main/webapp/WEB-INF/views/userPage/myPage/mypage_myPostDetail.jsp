<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mypage_myPostDetail.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />

<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/mypage_myPostDetail.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
<div class="info">게시글 상세보기</div>
	<div class="gnb">마이페이지 - 나의 게시글 상세보기</div>
<!-- 여기까지 메뉴 -->
<div class="allwrap">
   <div class="titlewrap">
      <h1 class="title">강아지가 너무 귀엽네요</h1>
      <p class="number">번호 2222</p>
   </div>
   <div class="writerwrap">
      <h1 class="writer">박현철</h1>
      <p class="date">22-08-13 17:30</p>
      <p class="hit">조회 333</p>
   </div>
   <div class="content">여기는 내용이다 강아지가 그리 귀엽나</div>
   <div class="reple">댓글 &nbsp; &nbsp; &nbsp; 2개</div>
   <div class="replewrap">
      <div class="replewriter">박현철</div>
      <div class="repledate">22-08-16 16:45</div>
      <div class="replebtnwrap">
         <input type="button" class="repleupdatebtn blueBtn" value="수정">
         <input type="button" class="repledeletebtn grayBtn" value="삭제">
      </div>
   </div>
   <div class="replecon">후ㅠ후헤헤헤히힣히ㅣㅎ</div>
   <div class="replewrap">
      <div class="replewriter">조영은</div>
      <div class="repledate">22-08-16 16:56</div>
      <div class="replebtnwrap">
         <input type="button" class="repleupdatebtn blueBtn" value="수정">
         <input type="button" class="repledeletebtn grayBtn" value="삭제">
      </div>
   </div>
   <div class="replecon">하하하하하핳하하하핳하하하ㅏㅎ</div>
   <div class="repleinsertwrap">
      <textarea rows="5" cols="120" class="repleinsert" 
      placeholder="로그인 하고 댓글을 입력해 보세요!(비로그인시) &#13;&#10; 댓글을 입력해 주세요!(로그인시)" ></textarea>
      <input type="button" class="repleinsertbtn blueBtn" value="등록">
    </div>
   <div class="btnwrap">
      <input type="button" class="registerbtn blueBtn" value="수정">
      <input type="button" class="cancelbtn grayBtn" value="삭제">
      <input type="button" class="listBtn blueBtn" value="목록으로"/>
   </div>
   <div class="popup_delete">
      삭제 하시겠습니까?
      <div class="popupbtn">
         <input type="button" class="popupyes" value="예">
         <input type="button" class="popupno" value="아니오">
      </div>
   </div>
   
</div>
</body>
</html>