<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/userPage/mypage_myPost.css"/>
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<style>
	.paging_area {
		margin-top:10px;
	}
	td{
	cursor: pointer;
	}
</style>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/mypage_myPost.js"></script>
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
	      url : "bbList", 
	      type : "POST", 
	      dataType : "json",
	      data : params,
	      success : function(res) {
	    	  BB(res.list);
	    	  drawPaging(res.pd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}
function BB(list){
	var html = "";
	for(var data of list) {
		html += "<tr num =\"" + data.TXT_NUM +"\">";
		html += "<td>"+ data.TXT_NUM +"</td>";
		html += "<td class=\"title\">"+ data.TITLE +"</td>";
		html += "<td>"+ data.HIT +"</td>";
		html += "<td>"+ data.REG_D +"</td>";
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
</head>
<body>
<c:import url="/ComImport"></c:import>
<input type="hidden" id="oldGbn" value="0" /> 
<input type="hidden" id="oldText" />
	<div class="info">나의 게시글 목록</div>
	<div class="gnb">마이페이지 - 나의 게시글</div>
	<form action="#" id="actionForm">
	<input type="hidden" name="mypageBack" value="1"/> 
	<input type="hidden" id="smemnum" name="smemnum" value="${sMemNum}"/>
	<input type="hidden" id="num" name="num" />
	<input type="hidden" id="page" name="page" value="1" />
		<div class="allwrap">
   <table>
   <colgroup>
   		<col width="100px;"/>
   		<col width="*"/>
   		<col width="100px;"/>
   		<col width="100px;"/>
   	</colgroup>
      <thead>
         <tr>
            <th>번호</th>
            <th>제목</th>
            <th>조회수</th>
            <th>작성일</th>
         </tr>
      </thead>
      <tbody>
      </tbody>
   </table>
   
   <div class="searchwrap">
      <div class="searchbox">
         <select class="searchselect" id="searGbn" name="searGbn">
            <option value="0">번호</option>
            <option value="1">제목</option>
         </select>
         <input type="text" class="searchtext" name="searchTxt" id="searchTxt" />
      </div>
      <input type="button" value="검색" class="searchbtn blueBtn" id="searchBtn" value="검색">
   </div>
    <div class="paging_area"></div>
   <input type="button" class="listBtn blueBtn" value="목록"/>
	</div>
	</form>
</body>
</html>