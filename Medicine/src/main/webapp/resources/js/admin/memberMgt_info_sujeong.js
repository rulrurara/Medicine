$(document).ready(function() {
				
			$(".Yes").on("click",function(){
				$(".poPup").hide();
				$("#sujeongForm").attr("action","memberMgtList");
				$("#sujeongForm").submit();
			});
				
			$(".No").on("click",function(){
					$(".poPup1").hide();
			});
			$(".No").on("click",function(){
					$(".poPup").hide();
			});
			$(".logo2").on("click", function() {
				location.href = "memberMgt.html";
			});
		
		});