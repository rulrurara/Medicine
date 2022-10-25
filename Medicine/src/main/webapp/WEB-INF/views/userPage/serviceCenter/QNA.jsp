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
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/common/popup.css" />
<script type="text/javascript" src="resources/script/common/popup.js"></script>
</head>
<script type="text/javascript">
$(document).ready(function(){
	$(".registerbtn").on("click",function(){
		if($.trim($("#title").val()) == ""){
			makeAlert("알림", "제목을 입력하세요." , function(){
				$("#title").focus();				
				});
		}else if($.trim($("#con").val()) == ""){
			makeAlert("알림", "내용을 입력하세요." , function(){
				$("#con").focus();				
				});
		}else{
			var params = $("#actionForm").serialize();
			$.ajax({
				url : "MediServiceAjax", 
				type : "post", 
				dataType : "json", 
				data : params, 
				success : function(res) { 
					switch(res.msg){
					case "success" :
				      if($(".popup_ok").css("display") == "none") {
					     $(".popup_ok").css("display","block");
					      }
						break;
					case "fail" :
						makeAlert("알림" , "등록에 실패하였습니다.");
						break;
					case "error" :
						makeAlert("알림" , "등록 중 문제가 발생하였습니다.");
						break;			
					}
				},
				error : function(request, status, error) { 
					console.log(request.responseText) 
				}
			})
			
		}
	})
 	$(".popupyes").on("click", function(){
	      $(".popup_ok").css("display","none");  
	      $(".popup_cancle").css("display","none");  
	      $("#title").val("");
	      $("#con").val("");
	  });
	 $(".cancelbtn").on("click", function(){
	      if($(".popup_cancle").css("display") == "none") {
	         $(".popup_cancle").css("display","block");
	      }
	  });
	 $(".FAQbtn").on("click", function(){
	      location.href="MediServiceFaq"
	  });

});
</script>
<style type="text/css">
.top_header {
	height: 100px;
	background-color:#F2E3D5;
}
.allWrap{
	min-width:1000px;
	width: 1200px;
	height:600px;
	margin : 0 auto;
	margin-top: 100px;
}
table{
	width: 1200px;
	height:600px;
	border-collapse: collapse;
	font-family:"Nanum-Square";
 	vertical-align: middle;
}
th, td{
	padding: 15px 0;
	border-top: 1px solid #f1f1f1;
    border-bottom: none;
}
tr:nth-child(1){
	border-top: 2px solid #000;
}
tr:last-child{
	border-bottom: 2px solid #000;
}
th {
	width:400px;
	font-size:20px;
}
td{
	height: auto;
    text-align: left;
    background: transparent;
    line-height: 1.5;
}
.text{
	width:90%;
	height: 32px;
	text-indent: 3px;
    padding: 5px 6px;
    border: 1px solid #e5e5e5;
    font-size: 14px;
    line-height: 20px;
    font-family:"Nanum-SquareR";
}
.textarea{
	border: 1px solid #e5e5e5;
	text-indent: 3px;
	padding: 5px 6px;
	font-size: 16px;
	font-family:"Nanum-SquareR";
}
.btnwrap{
	margin-top: 40px;
    text-align: center;
}
.registerbtn, .cancelbtn,.FAQbtn{
	width: 112px;
    height: 40px;
    background: #6799ff;
    border: none;
    font: 14px;
    font-family: "Nanum-Square";
    color: #fff;
    cursor: pointer;
    border-radius: 7px;
 }
.cancelbtn{
	margin-left:30px;
	background: #8c8c8c;
}
.gnb{
	font-size: 14px;
	float: right;
	margin-bottom:10px;
}
.popup_ok,.popup_cancle {
	background-color:#8c8c8c;
	width: 300px;
	height: 70px;
	border : 1px solid #b7b7b7;
	position: absolute;
	top: calc(50% - 50px);
	left: calc(50% - 150px);
	margin: 0 auto;
	text-align:center;
	font-size:15px;
	padding-top:30px;
	z-index:999;
	font-family: "Nanum-Square";
	border-radius: 7px;
	display:none;
} 
.popupyes,.popupno{
	width: 50px;
    height: 30px;
    background: #6799ff;
    border: none;
    font: 14px;
    font-family: "Nanum-Square";
    color: #fff;
    cursor: pointer;
    border-radius: 7px;
 }
.popupbtn{
 	margin-top:10px;
 }
.popupno{
	 margin-left:5px;
}
.FAQbtn{
	width: 180px;
    height: 40px;
    background: #8c8c8c;
}
</style>
<body>
<c:import url="/ComImport"></c:import>
<!--  메뉴 -->
<div class="allWrap">
<div class="gnb">고객센터-1:1문의</div>
	<input type="button" class="FAQbtn" value="자주묻는 질문(FAQ) 이동하기">
<table>
	<tbody>
	<form action="#" id="actionForm">
	<input type="hidden" name="memNum" value="${sMemNum}">
		<tr>
			<th>전화번호</th>
			<td><input name="phone" id="phone" type="text"  class="text" value="${data.PHONE}" readonly></td>
		</tr>
		<tr>
			<th>이메일</th>
			<td><input name="eamil" id="eamil" type="email" class="text" value="${data.EMAIL}" readonly> </td>
		</tr>
		<tr>
			<th>제목</th>
			<td><input name="title" id="title" type="text" class="text" placeholder="제목을 입력해 주세요"/></td>
		</tr>
		<tr>
			<th>내용</th>
			<td><textarea name="con" id="con" cols="86" rows="10" class="textarea" placeholder="내용을 입력해 주세요"></textarea></td>
		</tr>
	</form>
	</tbody>
</table>
	<div class="btnwrap">
		<input type="button" class="registerbtn" value="작성하기">
		<input type="button" class="cancelbtn" value="취소">
	</div>
	<div class="popup_ok">
		질문이 등록되었습니다. 
		<div class="popupbtn">
			<input type="button" class="popupyes" value="확인">
		</div>
	</div>
	<div class="popup_cancle">
		취소하시겠습니까? 
		<div class="popupbtn">
			<input type="button" class="popupyes" value="예">
			<input type="button" class="popupno" value="아니오">
		</div>
	</div>
</div>
</body>
</html>