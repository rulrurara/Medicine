$(document).ready(function() {

		$("#goForm2").on("click", function(){
      $("#actionForm").attr("action", "AOneList");
      $("#actionForm").submit();
     }); 
		$("#goForm").on("click", function(){
      $("#actionForm").attr("action", "AOneInfoAnswer");
      $("#actionForm").submit();
   });
});