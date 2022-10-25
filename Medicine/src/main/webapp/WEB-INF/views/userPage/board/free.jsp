<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/free.css" />

<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/free.js"></script>
</head>
<script type="text/javascript">
$(document).ready(function(){
	if("${param.searchGbn}" != ""){
		$("#searchGbn").val("${param.searchGbn}");
	}else {
		$("#oldGbn").val("0"); 
		// 검색 안한 상태에서 페이지 이동 시 oldgbn에 값이 ''로 들어가서 셀렉트에 아무것도 안뜸 그래서 초기값으로 0 줌
	}
	reloadList();
	$(".searchbtn").on("click" ,function(){
		$("#page").val("1");
		$("#oldGbn").val($(".searchselect").val());
		$("#oldTxt").val($(".searchtext").val());	
		reloadList();
	})
	$(".paging_area").on("click", "span", function(){
		$(".searchselect").val($("#oldGbn").val());
		$(".searchtext").val($("#oldTxt").val());			
		$("#page").val($(this).attr("page"));
		reloadList();
	})
	
	$(".writebtn").on("click",function(){
		location.href="MediFreeWrite"
	})
	$("tbody").on("click","tr",function(){
		$("#num").val($(this).attr("num"));

		$("#actionForm").attr("action","MediFreeDetail");
		$("#actionForm").submit();	
	})
})
function reloadList(){
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "MediFreeAjax", 
		type : "post", 
		dataType : "json", 
		data : params, 
		success : function(res) { 
				drawList(res.list);	
				drawPaging(res.pd);
		},
		error : function(request, status, error) { 
			console.log(request.responseText) 
		}
	})
}
function drawList(list){
	var html ="";
	for(var data of list){
		html +="<tr num=\" " + data.TXT_NUM + "\">  ";
		html +="<td> " + data.TXT_NUM + "</td>     ";
		html +="<td> " + data.NM + "</td>     ";
		html +="<td class=\"title\"> " + data.TITLE + "</td>     ";
		html +="<td> " + data.REG_D + "</td>     ";
		html +="<td> " + data.HIT + "</td>     ";
	    html += "</tr>         ";
	}
	$("tbody").html(html);
}
function drawPaging(pd){
	var html = "";
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	if($("#page").val() == 1){
	html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	}
	else{              
	html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1)+ "\">이전</span>";
	}
	for(i = pd.startP ; i<= pd.endP ; i++){
		if($("#page").val() * 1 == i){
			html += "<span class=\"page_btn_on\" page=\"" + i + "\"> " + i + "</span>";		
		}else{
			html += "<span class=\"page_btn\" page=\"" + i + "\"> " + i + "</span>";
		}
	}
	if($("#page").val()* 1 == pd.maxP){
		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";
		
	}else{
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	}
	html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	
	$(".paging_area").html(html);
}
</script>
<body>
<c:import url="/ComImport"></c:import>
<!-- 여기까지 메뉴 -->
<div class="allwrap">
<div class="gbn">자유게시판 목록</div>
	<table>
		<thead>
			<tr>
				<th>번호</th>
				<th>작성자</th>
				<th>제목</th>
				<th>작성일</th>
				<th>조회수</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	<div class="btnwrap">
		<input type="button" class="writebtn" value="글쓰기">
	</div>
	<div class="pagingwrap">
		<div class="paging_area">
         </div>
	</div>
	<div class="searchwrap">
		<div class="searchbox">
		<form action="#" id="actionForm">
		<input type="hidden" id="oldGbn" value="${param.searchGbn}"> 
		<input type="hidden" id="oldTxt" value="${param.searchTxt}"> 
			<input type="hidden" id="page" name="page" value="${page}">
			<input type="hidden" id="num" name="num">

			<select class="searchselect" name="searchselect">
				<option value="0">작성자</option>
				<option value="1">번호</option>
				<option value="2">제목</option>
			</select>
			<input type="text" class="searchtext" name="searchtext" value="${param.searchTxt}" >
		</form>
		</div>
		<input type="button" value="검색" class="searchbtn">
	</div>
</div>

</body>
</html>