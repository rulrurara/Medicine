$(document).ready(function() {
		$(".regsu").on("click", function() {
			$("#actionForm").attr("action","MedicineDetailList");
			$("#actionForm").submit();
		});
		$(".del").on("click",function(){
			$("#goForm").submit();
		});
		
});