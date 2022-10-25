	$(document).ready(function() {
		//목록 조회
		reloadList();

		
		   $("#ahcp").on('init', function(event, slick){
		      $(sliderTilt);
		   });

		   $("#ahcp").on('afterChange', function(event, slick, currentSlide){
		      $(sliderTilt);
		   });
		   
		   $("#ahcp").on("click", ".img", function(){
		      if(!$("#ahcp").hasClass("detail")){
		         $("#ahcp").addClass("detail");
		      $(".slick-arrow").addClass("none");
		      } else if ($("#ahcp").hasClass("detail")){
		         $("#ahcp").removeClass("detail");
		      $(".slick-arrow").removeClass("none");
		      }
		   }); 
		   
		   $("#logoutBtn").on("click", function() {
				location.href = "testALogin";
			});
			
			$("#insertBtn").on("click", function() {
				
				$("#actionForm").attr("action", "AHCPInsert");
				$("#actionForm").submit();
			});
			
		    $("#ahcp").on("dblclick", "li", function(){
		      console.log("zzzz");
		      $("#no").val($(this).attr("no"));
		      $("#actionForm").attr("action", "AHCPDetail");
		      $("#actionForm").submit();
		   }); 
	});


	function reloadList(){
	   var params = $("#actionForm").serialize();
	   
	   $.ajax({
	      url : "AhcpListAjax",
	      type : "POST", 
	      dataType : "json", 
	      data : params, 
	      success : function(res) { 
	         drawList(res.list);
	      },
	      error : function(request, status, error){ 
	         console.log(request.responseText); 
	      } 
	   });
	}

	function drawList(list){
	   var html = "";
	   
	   for(var data of list){ 
	      html +="<li no=\"" + data.INFO_NUM + "\">";
	      html +="<div class=\"item\">";
	      html +="<div class=\"img\"><img src=\"resources/upload/" + data.HEALTH_MAIN_PIC + "\">";
	      html +="<h2>" + data.TITLE  + "<br/>" + data.CON + "</h2>";
	      html +="</div>";
	      html +="</div>";
	      html +="</li>";
	   }
	   
	   $("#ahcp").html(html);
	   
	   $("#ahcp").slick({
	      dots: false,
	      arrows: true,
	      infinite: false,
	      centerMode: true,
	      focusOnSelect: false,
	      speed: 1000,
	      centerPadding: "15vw",
	      slidesToScroll: 1,
	      initialSlide: 1,
	      draggable: false
	   });
	}
	
	function sliderTilt(){
	   var itemPrev = $("#ahcp").find(".slick-current").prev("li").find(".item");
	   var itemNext = $("#ahcp").find(".slick-current").next("li").find(".item");

	   $(".item").tilt({
	      perspective: 300,
	      speed: 2000,
	      glare: false,
	      maxGlare: .2
	      });
	   itemPrev.tilt.destroy.call(itemPrev);
	   itemNext.tilt.destroy.call(itemNext);
	}