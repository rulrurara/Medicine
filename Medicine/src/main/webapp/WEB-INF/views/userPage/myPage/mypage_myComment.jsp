<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mypage_myComment.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />

<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/mypage_myComment.js"></script>
<style>
	.paging_area{
		margin-top:10px;
	}
</style>
<script type="text/javascript">
if("${param.searchGbn}" != ""){
	$(".searchselect").val("${param.searchGbn}");
}else {
	$("#oldGbn").val("0"); 
}
</script>
</head>
<body>
<c:import url="/ComImport"></c:import>
	<div class="info">       
		<select class="cate">
			<option value="0">자유게시판 댓글</option>
			<option value="1">의약품 리뷰 댓글</option>
		</select>
    </div>
	<div class="gnb">마이페이지 - 나의 댓글</div>
		<div class="allwrap">
   <table>
   <colgroup>
   		<col width="100px;"/>
   		<col width="*"/>
   		<col width="100px;"/>
   	</colgroup>
      <thead>
         <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
         </tr>
      </thead>
      <tbody>
      </tbody>
   </table>
   
   <div class="searchwrap">
      <div class="searchbox">
      
      <form action="#" id="actionForm" method="post">
      	<input type="hidden" name="mypageBack" value="2"/> 
		<input type="hidden" id="oldGbn" value="0"> 
		<input type="hidden" id="oldTxt" value="${param.searchTxt}"> 
		<input type="hidden" id="page" name="page" value="${page}">
		<input type="hidden" id="memnum" name="memnum" value="${sMemNum}">
		<input type="hidden" id="num" name="num">
		<input type="hidden" id="no" name="no">
         <select class="searchselect" name="searchselect">
            <option value="0">번호</option>
            <option value="1">제목</option>
         </select>
		<input type="text" class="searchtext" name="searchtext" value="${param.searchTxt}" >
		</form>
      </div>
      <input type="button" value="검색" class="searchbtn blueBtn" value="검색">
   </div>
    <div class="paging_area">
  </div>
   <input type="button" class="listBtn blueBtn" value="목록으로"/>
	</div>
</body>
</html>