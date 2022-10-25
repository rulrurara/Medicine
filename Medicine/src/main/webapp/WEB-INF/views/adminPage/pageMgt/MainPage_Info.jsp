<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상세보기 및 수정</title>
<link rel="stylesheet" type="text/css" href="resources/css/admin/MainPage_Info.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/admin_common.css" />
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/admin/MainPage_Info.js"></script>
<script type="text/javascript" src="resources/script/jquery/jquery.form.js"></script>
<script type="text/javascript" src="resources/js/common/admin_common.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$(".backimg").on("click",function(){
		$("#fix").click();
	});
	$(".Yes").on("click",function(){
		location.href = "mainPage";
	})
	$("#fix").on("change",function(event){
		
		var file = event.target.files[0];

	    var reader = new FileReader();
	    
	    reader.onload = function(e) {

	    	$("#imgch").attr("src", e.target.result);
	    }
	    reader.readAsDataURL(file);
	});
	$(".backimg2").on("click",function(){
		$("#fix2").click();
	});
	$("#fix2").on("change",function(event){
		
		var file = event.target.files[0];

	    var reader = new FileReader();
	    
	    reader.onload = function(e) {

	    	$("#imgch2").attr("src", e.target.result);
	    }
	    reader.readAsDataURL(file);
	});
	$(".aYes").on("click", function(){
		var form =$("#goactionForm");
	    	  // ajaxForm 적용
	    	  form.ajaxForm({
	    		  success: function(res){ // 데이터 주고 받기 성공 시
	    			if(res.result == "SUCCESS"){ // 파일 전송 성공
	    				// 올라간 파일이 존재한다면
	    				if(res.fileName.length > 0){
	    					$("#pic").val(res.fileName[0]);
	    					$("#pic2").val(res.fileName[1]);// 올라간 파일명 보관
	    				}
	    			
		 var params = $("#goactionForm").serialize();
         $.ajax({
        	 url : "mainAction/update",
        	 type : "POST",
        	 dateType : "json",
        	 data : params,
        	 success : function(res){
        		 switch (res.msg) {
				case "success":
					$(".poPup1").hide();
					location.href = "mainPage";
					break;
				case "failed":
					makeAlert("알림","등록에 실패했습니다.");
					break;
				case "error" :
					makeAlert("알림","등록 중 문제가 발생했습니다.");
					break;
				}
        	 },
        	 error : function(request, status , error){
        		 console.log(request.responseText);
        	 }
         });
		}
		else{
			makeAlert("알림","파일 업로드에 <br /> 문제가 발생했습니다.");
		}
	},
			error: function(){ // 에러 시
	    		makeAlert("알림","파일 업로드에 <br /> 문제가 발생하였습니다.");
	    		 }
	    	});
	    	form.submit();
	});
	$(".enroll").on("click",function(){
		$(".poPup1").show();
	});
});
</script>
</head>
<body>
<c:import url="/AdminImport"></c:import>
	<div class="right_wrap">
		<div class="poPup">
			<div class="data">취소 하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="Yes" value="네"></div>
			</div>
		</div>
		<div class="poPup1">
			<div class="data">수정 하시겠습니까?</div>
			<pre class="br"></pre>
			<div class="clickBtn">
				<div><input type="button" class="No" value="아니요"></div>
				<div><input type="button" class="aYes" value="네"></div>
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
				<p>
					<b>관리자 홈 > 페이지 관리 > 메인 페이지 > 상세보기 및 수정 </b>
				<p>
			</div>
			<form action="fileUploadAjax" id="goactionForm" method="post"
				enctype="multipart/form-data">
				<input type="hidden" name="impic" id="impic" value="${param.impic}"/>
				<input type="hidden" name="pic" id="pic" /> 
				<input type="hidden" name="pic2" id="pic2" />
				<input type="file" name="picFile" id="fix" /> 
				<input type="file" name="picFile2" id="fix2" />
				<table class="t">
					<colgroup>
						<!-- 전체 길이 1500기준. -->
						<col width="900" />
						<col width="500" />
					</colgroup>
					<tr>
						<!-- 사진(메인용) -->
						<th><textarea style="width: 90%; height: 90%;" id="title" name="title">${data.TITLE}</textarea></th>
						<td rowspan="3" class="backimg">
							<div>
								<img id="imgch" src="resources/upload/${data.HEADER_PIC}">
							</div>
						</td>
					</tr>
					<tr>
						<!-- 내용 -->
						<td rowspan="5"><textarea style="width: 90%; height: 90%;" id="con" name="con">${data.CON}</textarea></td>
					</tr>
					<tr></tr>
					<tr>
						<!-- 사진(헤더용) -->
						<td rowspan="3" class="backimg2">
							<div>
								<img id="imgch2" style="width: 500px" src="resources/upload/${data.DIET_MAIN_PIC}">
							</div>
						</td>
					</tr>
					<tr></tr>
					<tr></tr>


				</table>
			</form>
			<div>
				<input type="button" class="del btn" value="취소">
				<div class="btn_one"></div>
				<input type="button" class="enroll btn" value="수정완료">
				<div class="btn_one"></div>
			</div>
		</div>
	</div>
</body>
</html>