$(document).ready(function(){
    $(".cancelbtn").on("click", function(){
         if($(".popup_delete").css("display") == "none") {
            $(".popup_delete").css("display","block");
         }
     });
     $(".popupno").on("click", function(){
         $(".popup_delete").css("display","none");
     });
     $(".listBtn").on("click", function() {
			history.back();
	 });
});