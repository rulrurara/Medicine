<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<script type="text/javascript" src="resources/js/common/common.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<script type="text/javascript">
$(document).ready(function(){
	reloadList();
	$(".conwrap").on("click", ".con",function(){
		console.log(" qweqwe")
		// 질문
	});
	 $(".QNAbtn").on("click", function(){
	      location.href="MediServiceQna"
	  });
	$(document).on("click",".con",function (){
		var nono = $(this).attr("no");
 		status = $("."+nono).css("display");
		if(status == "none") {
			$("."+nono).css("display", "flex");
		}else {
			$("."+nono).css("display", "none");
		} 
	});
	$(".paging_area").on("click", "span", function(){		
		$("#page").val($(this).attr("page"));
		reloadList();
	})
});
function reloadList(){
	var params = $("#actionForm").serialize();
	$.ajax({
		url : "MediFAQAjax", 
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
	var cnt = 1;
	for(var data of list){
		html +="<div class=\"conwrap\">";
		html +="<p class=\"congbn\">" + data.GBN_NM +"</p>";
		html +="<p class=\"con\" no=\""+ cnt +"\">" + data.TITLE +"</p>";
		html +="</div>";
		html +="<div class=\"replywrap " +cnt +"\">";
		html +="<p class=\"reply\"> 답변</p>";
		html +="<p class=\"replycon\" >" + data.CON +"</p>";
		html +="</div>";
		cnt++;
	}
	$(".list").html(html);
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
<style type="text/css">
.minwidth{
	min-width: 1300px;
}
.top_header {
	height: 100px;
	background-color:#F2E3D5;
}
.wraps{
	width: 1200px;
	margin: 0 auto;
	margin-top:100px;
}
.headwrap{
	display:flex;
	border-top: 2px solid #000;
	border-bottom: 1.5px solid #000;
}
.gbn , .title{
	display:block;
	font-size: 18px;
	width: 160px;
    text-align: center;
    font-family:"Nanum-Square";
}
.gnb{
	display:inline-block;
}
.title{
    flex: 1;
}
.conwrap{
	display:flex;
	border-bottom: 1px solid #e5e5e5;
}
.congbn , .con{
	display:block;
	font-size: 20px;
	width: 160px;
    text-align: center;
    font-family:"Nanum-Square";
}
.con{
    flex: 1;
    cursor: pointer;
}
.replywrap{
	/*display:flex;*/
	display:none;
	background-color:#f5f5f5;
	vertical-align:middle;
	justify-content: center;
}
.reply , .replycon{
	display:block;
	font-size: 20px;
	width: 160px;
    text-align: center;
    font-family:"Nanum-Square";
    color:#6e6e6e;
}
.reply{
	justify-content: center;
}
.replycon{
	flex: 1;
}
.pagingwrap{
	margin-top:40px;
	
}
.gnb{
	margin-left:932px;
	font-size: 14px;
	margin-bottom:10px;

}
.QNAbtn{
    border: none;
    font: 14px;
    font-family: "Nanum-Square";
    color: #fff;
    cursor: pointer;
    border-radius: 7px;
	width: 180px;
    height: 40px;
    background: #8c8c8c;
}
.paging_area{
	position: relative;
	text-align: center;
	display: block;
	left:83px;

}
</style>
</head>
<body>
<!--  메뉴 -->
<c:import url="/ComImport"></c:import>
<!--  메뉴 -->
<form id="actionForm" action="#">
	<input type="hidden" id="page" name="page" value="${page}">
</form>
<div class="minwidth">
<div class="wraps">
<input type="button" class="QNAbtn" value="1대1문의(QNA)이동하기">
	<div class="gnb">고객센터-FAQ</div>
	<div class="headwrap">
		<p class="gbn">구분 </p>
		<p class="title">제목 </p>
	</div>
	<div class="list">
	</div>
	<div class="pagingwrap">
		<div class="paging_area">
         </div>
	</div>
</div>
</div>
</body>
</html>