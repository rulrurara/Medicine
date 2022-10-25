<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mypage_myAnswer.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/mypage_myAnswer.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	reloadList();
	$(".paging_area").on("click","span",function(){
		$("#page").val($(this).attr("page"));
		// 기존 값 유지
		$("#searGbn").val($("#oldGbn").val());
		$("#searchTxt").val($("#oldText").val());
		
		reloadList();
	});
	// 검색 클릭시
	$("#searchBtn").on("click",function(){
		$("#page").val("1");
		// 기존 값 유지
		$("#oldGbn").val($("#searGbn").val());
		$("#oldText").val($("#searchTxt").val());
		
		reloadList();
	});
});
function reloadList(){
	var params = $("#actionForm").serialize();
	$.ajax({
	      url : "answerList", 
	      type : "POST", 
	      dataType : "json",
	      data : params,
	      success : function(res) {
	    	  answer(res.list);
	    	  drawPaging(res.pd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}
function answer(list){
	var html = "";
	for(var data of list) {
		html += "<tr no =\"" + data.Q_NUM +"\">";
		html += "<td>"+ data.Q_NUM +"</td>";
		html += "<td class=\"title\">"+ data.TITLE +"</td>";
		html += "<td>"+ data.REG_D +"</td>";
		html += "<td>"+ data.AON +"</td>";
		html += "</tr>";
	}
	$("tbody").html(html);
}
function drawPaging(pd){
	var html = "";
	  html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	  // 이전 구현
	  if($("#page").val() == "1"){
		  html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	  }
	  else {
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1)+ "\">이전</span>";
	  }
	  for(var i = pd.startP; i <= pd.endP; i++){
		  if($("#page").val() * 1 == i){ // 현재 페이지 구현
			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		  }
		  else{ // 다른 페이지 구현
	  		html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		  }
	  }
	  if($("#page").val() * 1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면,, 구현
	  	html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>"; 
	  }
	  else{
		  html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	  }
	  html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	$(".paging_area").html(html);
}
</script>
<style type="text/css">
.paging_area {
	margin-top:10px;
}
</style>
</head>
<body>
<c:import url="/ComImport"></c:import>
<input type="hidden" id="oldGbn" value="0" /> 
<input type="hidden" id="oldText" /> 

	<div class="info">나의 문의 목록</div>
	<div class="gnb">마이페이지 - 나의 1:1 문의</div>
<form action="MyPageAnswerDetail" id="actionForm">
	<input type="hidden" id="smemnum" name="smemnum" value="${sMemNum}"/>
	<input type="hidden" id="no" name="no" />
	<input type="hidden" id="page" name="page" value="1" />
<!-- 여기까지 메뉴 -->
	<div class="allwrap">
		<table>
			<colgroup>
				<col width="100px;" />
				<col width="*" />
				<col width="100px;" />
				<col width="100px;" />
			</colgroup>
			<thead>
				<tr>
					<th>문의번호</th>
					<th>제목</th>
					<th>작성일</th>
					<th>답변상태</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<!-- 
   <div class="btnwrap">
      <input type="button" class="writebtn" value="글쓰기">
   </div>
    -->
		<div class="searchwrap">
			<div class="searchbox">
				<select class="searchselect" id="searGbn" name="searGbn">
					<option value="0">번호</option>
					<option value="1">제목</option>
				</select> 
				<input type="text" class="searchtext" name="searchTxt" id="searchTxt" />
			</div>
			<input type="button" value="검색" class="searchbtn blueBtn"
				id="searchBtn" value="검 색">
		</div>

		<div class="paging_area"></div>
		<input type="button" class="listBtn blueBtn" value="목록으로" />
	</div>
</form>
</body>
</html>