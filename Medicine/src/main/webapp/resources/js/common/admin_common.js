$(document).ready(function() {
		console.log($("#AmemNo").val() + "  dsadsadsa");
		console.log($("#AmemCo").val() + "  dsadsadsa");
		if ($("#AmemNo").val() == "" || $("#AmemCo").val() == 0){
			alert("로그인 후 이용바랍니다~");
			location.href="AdminLogout";
		};
    		 
	   $("#menuLogoutBtn").on("click", function() {
			location.href = "AdminLogout";
		});
      
      $(".reg").on("click",function() {
            if ($(".poPup3").css("display") == "block") {
               $(".poPup3").hide();
            } else if ($(".poPup3").css("display") == "none") {
               $(".poPup3").show();
            }
         });
         
      $(".del").on("click",function() {
            if ($(".poPup").css("display") == "block") {
               $(".poPup").hide();
            } else if ($(".poPup").css("display") == "none") {
               $(".poPup").show();
            }
         });
         
       
      $(".No").on("click",function(){
         $(".poPup").hide();
         $(".poPup2").hide();
         $(".poPup3").hide();
         $(".poPup1").hide();
         $(".poPup6").hide();
         $(".poPup4").hide();
         $(".poPup5").hide();
         $(".poPup7").hide();
      });
      
      $(".logo2").on("click", function() {
         location.href = "memberMgtList";
      });
      $(".elements_member").on("click", function() {
         location.href = "memberMgtList";
      });
      $(".elements_med").on("click", function() {
         location.href = "Medicine";
      });
      $(".elements_healthFood").on("click", function() {
         location.href = "healthFoodMgtList";
      });
      $(".dropdown_board").on("click", function() {
         location.href = "AFreeList";
      });
      $(".dropdown_mgt").on("click", function() {
         location.href = "AOneList";
      });
      $(".dropdown_faq").on("click", function() {
         location.href = "AFAQList";
      });
      $(".elements_main").on("click", function(){
         location.href = "mainPage";
      });
      $(".elements_healthCare").on("click", function(){
         location.href = "AHCPList";
   });
   
   const div = document.getElementById('dropdown1');
      div.addEventListener('mouseover', (event) => {
           $("#dropdown").hide();
      });
      div.addEventListener('mouseout', (event) => {
           $("#dropdown").show();
      });
});
