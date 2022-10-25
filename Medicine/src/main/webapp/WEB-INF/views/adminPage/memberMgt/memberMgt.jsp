<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>목록</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/admin/memberMgt.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript" src="resources/js/admin/memberMgt.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	reloadList();
	
	$(".paging_area").on("click","span",function(){
		$("#page").val($(this).attr("page"));

		$("#searchGbn").val($("#oldGbn").val());
		$("#searchText").val($("#oldText").val());
		
		reloadList();
	});
	
	$("tbody").on("click","td",function(){
		$("#no").val($(this).parent().attr("no"));
		
		$("#searchGbn").val($("#oldGbn").val());
		$("#searchTxt").val($("#oldTxt").val());
		
		$("#searchForm").attr("action","memDetail");
		$("#searchForm").submit();
	});
	
	$("tbody").on("click","#check",function(){
	      var arr = [];
	      console.log("클릭됨")
	      $("#check:checked").each(function(){
	         arr.push($(this).val());
	      })
	     
	      $("#delete").val(arr);
	      
	   });
	$(".Yes").on("click",function(){
		   var params = $("#searchForm").serialize();
        $.ajax({
           url : "memberAction/update", //경로
           type : "POST", //전송방식
           dateType : "json", //데이터 형태
           data : params, //보낼 데이터
           success : function(res) { //성공했을 때 결과를 result에 받고 함수 실행
              switch(res.msg) { //ATController -> ATAction컨트롤러의 msg값
              case "success" :
             	$(".poPup").hide();
             	reloadList();
                 break;
              case "failed" :
                 makeAlert("알림","삭제에 실패했다!");
                 break;
              case "error" :
                 makeAlert("알림","삭제 중 문제가 발생했다!");
                 break;
              }
           },
           error : function(request,status,error) { //실패했을 때 함수 실행
              console.log(request.responseText); //실패 상세내역
           }
        });
	   });
	
});
function reloadList(){
	var params = $("#searchForm").serialize();
	$.ajax({
	      url : "memberList", 
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) {
	    	  List(res.list);
	    	  Paging(res.pd);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
}
function List(list){
	var html="";
	for(var data of list){
		html += "<tr no =\"" + data.MEM_NUM + "\">";
		html += "<th>"+"<input type=\"checkbox\" id=\"check\" value=\"" + data.MEM_NUM + "\">"+"</th>";
		html += "<td>"+ data.MEM_NUM +"</td>";
		html += "<td>"+ data.AUTHOR_CODE +"</td>";
		html += "<td>"+ data.NM +"</td>";
		html += "<td>"+ data.ID +"</td>";
		html += "<td>"+ data.EMAIL +"</td>";
		html += "<td>"+ data.PHONE +"</td>";
		html += "</tr>";
	}
	$("tbody").html(html);
}
function Paging(pd){
	var html = "";

	   html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	   // 이전
	   if($("#page").val() == "1"){
	   		html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	   }else{
	   		html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 -1) + "\">이전</span>";			   
	   }
	   
	   for(var i = pd.startP; i <= pd.endP; i++){
		   if($("#page").val() * 1 == i){ // 현재 페이지
	   			html += "<span class=\"page_btn_on\" page=\"" + i + "\">" + i + "</span>";
		   }else{ // 다른페이지
	   			html += "<span class=\"page_btn\" page=\"" + i + "\">" + i + "</span>";
		   }
	   }
	   
	   if($("#page").val() * 1 == pd.maxP){ // 현재 페이지가 마지막 페이지라면..
	   		html += "<span class=\"page_btn page_next\" page=\"" + pd.maxP + "\">다음</span>";			   
	   }else{
	   		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";			   			   
	   }
	   
	   html += "<span class=\"page_btn page_last\" page=\"" + pd.maxP + "\">마지막</span>";
	   
	   $(".paging_area").html(html);
}
</script>
<style type="text/css">
.paging_area{
	left: calc(50% - 50px);
}
</style>
</head>

<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="poPup">
			<div class="data">삭제하시겠습니까?</div>
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
				<p><b>관리자 홈 > 회원 관리</b><p>
			</div>
			<table class="t">
				<colgroup>
					<col width="100" />
					<col width="100" />
					<col width="150" />
					<col width="200" />
					<col width="300" />
					<col width="250" />
				</colgroup>
				<thead>
					<tr>
						<th></th>
						<th>회원번호</th>
						<th>분류</th>
						<th>회원명</th>
						<th>아이디</th>
						<th>이메일</th>
						<th>전화번호</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			<div class="select_bar">
				<input type="hidden" id="oldGbn" value="0" /> 
				<input type="hidden" id="oldText" /> 
				<form action="#" id="searchForm" method="post">
				<input type="hidden" name="delete" id="delete" />
				<input type="hidden" name="no" id="no" />
				<input type="hidden" name="page" id="page" value="1" />
				<select class="select_1" name="searchGbn" id="searchGbn" >
					<option value="0">회원명</option>
					<option value="1">번호</option>
					<option value="2" selected="selected">아이디</option>
				</select> <input type="text" class="text" name="searchText" placeholder="검색하세요." /> <input
					type="button" class="serbtn" value="검색">
				</form>
			</div>
			<br /> <br />

			<div class="paging_area"></div>
			<div>
				<input type="button" class="del btn" value="삭제">
					<div class="btn_one"></div>
				<form action="memInsert" id="goForm">
					<input type="button" class="reg btn" value="등록">
						<div class="btn_one"></div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>