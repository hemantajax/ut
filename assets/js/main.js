(function($){

	var $utAlbums = $("#allUTAlbum"),



		getUTAlbums = function (){
	      $.ajax({
	        url:"http://graph.facebook.com/FansOfUnrealTournament?fields=albums",
	        dataType: "json",
	        success:function(data){
	          var data = $.grep(data.albums.data, function(obj, i){
	          		return obj.name !== "Untitled Album";
	          }),

          	  html = "";
          	  

	         if($("#utAlbums").length){
	         	var photoTemplate = $("#footerPhotoTemplate").html();
	         	
	         	html = Mustache.to_html(photoTemplate, data);
	         	$("#utAlbums").html(html);

	          }
	          console.log($("#allUTAlbum"));
	          if($("#allUTAlbum").length){
              	var albumTemplate = $("#albumTemplate").html();
	          	
	          	html = Mustache.to_html(albumTemplate, data);
	          	$("#allUTAlbum").html(html);
	
	          }	  
	          		  
	          	  		
	          $("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});
	        },
	        error: function(data){
	          console.log("error", data);
	        }
	      });
    	},

    	getPhotosInSingleAlbum = function(albumId){

			      $.ajax({
			        url:"http://graph.facebook.com/" + albumId + "?fields=photos.fields(source)",
			        dataType: "json",
			        success:function(data){console.log(data.photos.data);

			          var photoTemplate = $("#photoAlbum").html(),
			          	  html = Mustache.to_html(photoTemplate, data.photos.data); 
			          	  
			          $("#allUTAlbum").html(html);	  		
			          $("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});
			        },
			        error: function(data){
			          console.log("error", data);
			        }
			      });

    	},

		initApp =  function(){
			getUTAlbums();
			//getPhotosInSingleAlbum();
		};

		initApp();

	/*
	    Slider
	*/
	$(window).load(function() {
	  // The slider being synced must be initialized first
	  $('#carousel').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    itemWidth: 210,
	    asNavFor: '#slider'
	  });
	   
	  $('#slider').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    sync: "#carousel"
	  });
	});

	/*
	    Show latest tweets
	*/
	jQuery(function($) {
	    $(".show-tweets").tweet({
	        username: "utgang1",
	        page: 1,
	        count: 10,
	        loading_text: "loading ..."
	    }).on("loaded", function() {
	        var ul = $(this).find(".tweet_list");
	        var ticker = function() {
	            setTimeout(function() {
	                ul.find('li:first').animate( {marginTop: '-4em'}, 500, function() {
	                    $(this).detach().appendTo(ul).removeAttr('style');
	                });
	                ticker();
	            }, 5000);
	        };
	        ticker();
	    });
	});


      	$utAlbums.on("click", "h4 a", function(e){
      		var $this = $(this), 
      			$title= $("#albumTitle");

      		$title.append(' / <span class="photos" href="#">'+$(this).text()+'</span>');

      		getPhotosInSingleAlbum($this.data('id'));
      		e.preventDefault();
      	});

		$("#albumTitle").on("click", ".all", function(e){
			$("#albumTitle").html('<a href="#" id="active-imgs" class="all">All UT Albums</a>');
			e.preventDefault();
			getUTAlbums();
		});

})(jQuery);