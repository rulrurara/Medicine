<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="resources/css/common/cmn.css" />
<link rel="stylesheet" type="text/css" href="resources/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="resources/css/userPage/medicineInfo_main.css"/>
<script type="text/javascript" src="resources/script/jquery/jquery-1.12.4.js"></script>
<script type="text/javascript" src="resources/js/common/common.js"></script>
<script type="text/javascript" src="resources/js/userPage/medicineInfo_main.js"></script>
</head>
<body>
<c:import url="/ComImport"></c:import>
<!-- 여기서부터  -->
<div class="main_border">
	<div class="search_border">
		<form action="#" id="actionForm" method="post">
			<input type="text" class="productName searchTxt" id="productName" name="searchTxt" placeholder="제품명으로 찾기"  />
			<input type="button" class="searchPN searchBtn" id="searchPN searchBtn" />
			<input type="text" class="companyName searchTxt2" id="companyName" name="searchTxt2" placeholder="업체명으로 찾기" />
			<input type="button" class="searchCN searchBtn" id="searchCN searchBtn"/>
			<input type="text" class="ingredientName searchTxt3" id="ingredientName" name="searchTxt3" placeholder="성분명으로 찾기"  />
			<input type="button" class="searchIN searchBtn" id="searchIN searchBtn" />
			
			<input type="hidden" id="searchGbn" name="searchGbn" value=""/>
		</form>
	</div>
	<input type="button" class="resetBtn" id="resetBtn" value="초기화"/>
</div>

</body>
</html>