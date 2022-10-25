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
<link rel="stylesheet" type="text/css" href="resources/css/userPage/freeDetail.css" />
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/freeDetail.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<script type="text/javascript">
$(document).ready(function(){
	reloadList();
	if($("num").val)
	$(".listbtn").on("click",function(){
		
		if("${param.mypageBack}" == 1){
			location.href="MyPagePost";
		}else if("${param.mypageBack}" == 2){
			location.href="MyPageReple";
		}
		
		
		else {
			$("#actionForm").attr("action","MediFreeList");
			$("#actionForm").submit();
		}	
			
	})
	
	 $(".deletebtn").on("click", function(){
	      if($(".popup_delete").css("display") == "none") {
	         $(".popup_delete").css("display","block");
	      }
	  });
	
	 $(document).on("click", ".repleupdatebtn",function(){
		 $("#con").val($(this).attr("repcon"));
		 $("#repNum").val($(this).attr("repnum"))
		$(".repleinsertbtn").hide();
		$(".repleinsertupdatebtn").show();
	 });
	 
	 $(".repleinsertupdatebtn").on("click", function(){
		 $("#conn").val($("#con").val());
		 action("update");
	 });
	 
	 $(document).on("click",".repledeletebtn", function(){
		 $("#repNum").val($(this).attr("repnum"))
		 console.log($("#repNum").val());
		 console.log("dsdsdsd");
		 action("delete");
	  });
	 
	 $(".repleinsertbtn").on("click", function(){
		 if($("#smemnum").val()=="" || $("#smemnum").val()==null){
		 makeAlert("알림" , "로그인이 필요한 서비스 입니다.");
		 }else{
		 $("#conn").val($("#con").val());
		 action("insert");
		 }
	  });
 	$(".popupno").on("click", function(){
	      $(".popup_delete").css("display","none");  
	  });
 	$(".popupyes").on("click", function(){
	      $(".popup_delete").css("display","none");  
	     var params = $("#actionForm").serialize();
	  	$.ajax({
	  		url : "FreeAction/delete", 
	  		type : "post", 
	  		dataType : "json", 
	  		data : params, 
	  		success : function(res) { 
				switch(res.msg){
				case "success" :
					$("#actionForm").attr("action","MediFreeList");
					$("#actionForm").submit();	
					break;
				case "fail" :
					makeAlert("알림" , "삭제에 실패하였습니다.");
					break;
				case "error" :
					makeAlert("알림" , "삭제 중 문제가 발생하였습니다.");
					break;
				}
	  		},
	  		error : function(request, status, error) { 
	  			console.log(request.responseText) 
	  		}
	  	})
	  });
 	$(".updatebtn").on("click",function(){
		$("#actionForm").attr("action","MediFreeUpdate");
		$("#actionForm").submit();
 	})
})
function reloadList(){
    var params = $("#actionForm").serialize();
  	$.ajax({
  		url : "FreeRepleAjax", 
  		type : "post", 
  		dataType : "json", 
  		data : params, 
  		success : function(res) { 
			drawList(res.list)
			drawPaging(res.pd);
  		},
  		error : function(request, status, error) { 
  			console.log(request.responseText) 
  		}
  	})	
	
}
function drawList(list){
	var html = "";	
	for(var data of list){
		html+="<div class=\"replewrap\">";
		html+="<div class=\"replewriter\">"+data.NM+"</div>";
		html+="<div class=\"repledate\">"+data.REG_D+"</div>";
		html+=" <div class=\"replebtnwrap\">";
		if($("#smemnm").val() == undefined){
			
		}else{
			if($("#smemnm").val() == data.NM){
		html+="<input type=\"button\" class=\"repleupdatebtn\" repnum=\""+data.REP_NUM+"\" repcon=\""+data.CON+"\"  value=\"수정\">";
		html+="<input type=\"button\" class=\"repledeletebtn\" repnum=\""+data.REP_NUM+"\" value=\"삭제\">";
			}
		}
		html+=" </div>";
		html+=" </div>";
		html+=" <div class=\"replecon\">"+data.CON+"</div>";
	}	
	$(".repleStart").html(html);
}
function drawPaging(pd2) {
	var html = "";
	
	html += "<span class=\"page_btn page_first\" page=\"1\">처음</span>";
	
	// 이전
	if($("#page").val() == "1"){
	html += "<span class=\"page_btn page_prev\" page=\"1\">이전</span>";
	} else{
	html += "<span class=\"page_btn page_prev\" page=\"" + ($("#page").val() * 1 - 1) + "\">이전</span>";
	}
	
	for(var i=pd2.startP; i<=pd2.endP; i++){
		if($("#page").val() *1 == i){ // 현재 페이지
			html += "<span class=\"page_btn_on\" page=\"" + i + "\"> " + i + "</span>";
		}else{ // 다른 페이지
			html += "<span class=\"page_btn\" page=\"" + i + "\"> " + i  + "</span>";
		}
	}
	
	if($("#page").val() *1 == pd2.maxP){ // 현재 페이지가 마지막 페이지라면
		html += "<span class=\"page_btn page_next\" page=\"" + pd2.maxP + "\">다음</span>";		
	}else{
		html += "<span class=\"page_btn page_next\" page=\"" + ($("#page").val() * 1 + 1) + "\">다음</span>";
	}
	
	html += "<span class=\"page_btn page_last\" page=\"" + pd2.maxP + "\">마지막</span>";
	
	$(".paging-area").html(html);
}
var msg = {
		"insert" : "등록",
		"update" : "수정",
		"delete" : "삭제",
}
function action(flag){
	$("#conn").val($("#conn").val().replace(/</gi, "&lt"))
	$("#conn").val($("#conn").val().replace(/>/gi, "&gt"))
 	var params = $("#actionForm").serialize();
	$.ajax({
		url : "freeRepleAction/" + flag, //경로 문자열 더하기 문자열은 문자열
		type : "post", //전송방식 get: 주소형태 , post : 주소 헤더형태
		dataType : "json", //데이터 형태
		data : params, //데이터 보낼 떄
		success : function(res) { 
				switch(res.msg){
				case "success" :
					$("#con").val("");
					switch(flag){
					case "insert" :
						$("#con").val("");
						reloadList();
						break;
					case "delete" : 
						reloadList();
						break;
					case "update" : 
						reloadList();
						$("#con").val("");
						$(".repleinsertbtn").show();
						$(".repleinsertupdatebtn").hide();
						break;
					}
					break;
				case "fail" :
					makeAlert("알림" , msg[flag]  + "에 실패하였습니다.");
					break;
				case "error" :
					makeAlert("알림" , msg[flag]  + "중 문제가 발생하였습니다");
					break;
				}	
				reloadList();
				
		},
		error : function(request, status, error) {  
			console.log(request.responseText) 
		}
	})//ajax end 
}//action function end
</script>
<body>
<c:import url="/ComImport"></c:import>
<!-- 여기까지 메뉴 -->
<form action="#" id="actionForm" method="post">
	<input type="hidden" id="smemnm" value="${sMemNm}">
	<input type="hidden" id="smemnum" name ="smemnum" value="${sMemNum}">
	<input type="hidden" name="num" id="num" value="${data.TXT_NUM}">
	<input type="hidden" name="page" value="${param.page}"> 
	<input type="hidden" name="page1" value="1"> 
	<input type="hidden" name="searchGbn" value="${param.searchGbn}"> 
	<input type="hidden" name="searchTxt" value="${param.searchTxt}"> 
	<input type="hidden" name="repNum" id="repNum" > 
	<input type="hidden" name="con" id="conn" > 
</form>
<div class="allwrap">
<div class="gnb">자유게시판-상세보기</div>
	<div class="titlewrap">
		<h1 class="title">${data.TITLE} </h1>
		<p class="number">번호: ${data.TXT_NUM}</p>
	</div>
	<div class="writerwrap">
		<h1 class="writer">작성자: ${data.NM}</h1>
		<p class="date">${data.REG_D}</p>
		<p class="hit">조회수: ${data.HIT}</p>
	</div>
	<div class="content">${data.CON}</div>
	
	
		<div class="reple">댓글 &nbsp; &nbsp; &nbsp; ${cnt}개</div>
	<div class="repleStart">
	</div>
	<div class="paging-area"></div>
	
	<div class="repleinsertwrap">
		<textarea rows="5" cols="120" class="repleinsert" id="con"
		placeholder= "댓글을 입력해 주세요!" ></textarea>
		<input type="button" class="repleinsertbtn" value="등록">
		<input type="button" class="repleinsertupdatebtn" value="수정">
	 </div>
	 
	 
	 <div class="btnwrap">
	 <c:choose>
		<c:when test="${sMemNm eq data.NM}"> 
			<input type="button" class="updatebtn" value="수정">
			<input type="button" class="deletebtn" value="삭제">
			<input type="button" style="float:right" class="listbtn" value="목록">
		</c:when>
		<c:otherwise>
			<input type="button" class="listbtn" value="목록">
		</c:otherwise>
	</c:choose>
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