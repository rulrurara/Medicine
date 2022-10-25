$(document).ready(function() {
	$("#backBtn").on("click", function() {
	$("#actionForm").attr("action", "AHCPList");
	$("#actionForm").submit();
});

$("#delBtn").on("click", function() {
		var params = $("#actionForm").serialize();
		$.ajax({
		url : "AHCPAction/delete", // 경로
		type : "POST",
		dataType : "json",
		data : params,
		success : function(
				res) {
			switch (res.msg) {
			case "success":
				$("#actionForm").attr("action","AHCPList");
				$("#actionForm").submit();
				break;
			case "fail":
				makeAlert("알림","삭제에 실패하였습니다.");
				break;
			case "error":
				makeAlert("알림","삭제 중 문제가 발생하였습니다.");
				break;
			}
		},
		error : function(request,status,error) {
			console.log(request.responseText);
		}
	});
});
$("#updateBtn").on("click", function() {
	$("#actionForm").attr("action", "AHCPUpdate");
	$("#actionForm").submit();
});

});