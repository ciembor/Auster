$(document).ready(function() {
	
	/////////////////////////////////////////////////////////////////// social media
	
	(function() {
	
		// facebook button
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	
		// twitter button
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	
		// google plus button
		(function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		})();
	
	})();
	
	/////////////////////////////////////////////////////////////////// preload images
	
	function preload(arrayOfImages) {
		$(arrayOfImages).each(function(){
			(new Image()).src = this;
		});
	}

	preload([
		'img/blood.png',
		'img/ciembor.png'
	]);
	
	/////////////////////////////////////////////////////////////////// beggercat
	
	$("#beggercat path, #beggercat circle").hover(
		function() {
			$("#beggercat-cloud").text("Kill BeggerCat");
			$("#beggercat-cloud").addClass("kill-beggercat");
			$("#beggercat-cloud").removeClass("please-share");
		},
		function() {
			$("#beggercat-cloud").text("Please, share");
			$("#beggercat-cloud").addClass("please-share");
			$("#beggercat-cloud").removeClass("kill-beggercat");
	});
	
	$("#beggercat").click(function() {
		$("#beggercat-outer").addClass("blood");
		$(this).hide();
		$("#beggercat-cloud").text("Please, share");
		$("#beggercat-cloud").addClass("please-share");
		$("#beggercat-cloud").removeClass("kill-beggercat");
		$("#main-footer .right").animate({ marginRight: "-135px"} , 1000);
	})
	
	////////////////////////////////////////////////////////////////// navigation scroll
	
	var navi = $('#navi');
	navi.jScrollPane({
		autoReinitialise: true,
		hideFocus: true,
		autoReinitialiseDelay: 1,
		animateScroll: true
	});
	var jsp = navi.data('jsp');
	var lock = false
	var old_active;
	var links = $('aside a[href^="#"]');
	var cache = [];
	var i, target;
	var top_margin = 77;
	var offset = top_margin - 22;
	var links_top_margin = 42;
	var pre_width = $("#main-header").width() - $("#left-column").width() - 110;

	function refresh_cache() {
		for (i = 0; i < links.length; i++) {
			target = $($(links[i]).attr("href"));
			cache.push({
				'link': $(links[i]),
				'target': target,
				'target_top': target.offset().top,
			});
		}
		
		pre_width = $("#main-header").width() - $("#left-column").width() - 110;
	}
	
	refresh_cache();

	// animates marker and add .active classes
	function animate(link, target) {
		var position;
		var marker_position;
		var border_line = 84;
		var active_offset;

		old_active = $(".active");
		$('aside .active').removeClass("active");
		link.addClass("active");
		
		if (!link.is(old_active)) {
			position = $(".active").position();
			marker_position = position.top + $("#left-column .inner").scrollTop() - links_top_margin;
			active_offset = $(".active").offset();
			
			if (active_offset.top - $(window).scrollTop() > $(window).height() - border_line - 20) {
				$("#navi").stop();
				// $("#navi").animate({scrollTop: marker_position - $("#left-column").height() + border_line + 16}, 300);
				jsp.scrollToY(marker_position - $("#left-column").height() + border_line + 16);
			} else if (active_offset.top - $(window).scrollTop() < border_line + 20) {
				$("#navi").stop();
				// $("#navi").animate({scrollTop: marker_position}, 300);
				jsp.scrollToY(marker_position);
			}
			
			$("#marker").stop();
			$("#marker").animate({marginTop: marker_position}, 300, function() {
				var id = target.attr("id");
				target.attr("id", "");
				window.location.hash = id;
				target.attr("id", id);
				lock = false;
			});
			
			$("#content .active").removeClass("active");
			target.addClass("active");
		}
		
	}

	function checkSectionSelected(scrolledTo){

		var i, prev_target_top;

		for (i = 0; i < cache.length; i++) {

			if (false === lock && scrolledTo < cache[i].target_top && scrolledTo > (i ? cache[i-1].target_top : 0) ) {
				animate(cache[i].link, cache[i].target);
				break;
			}

		};
	}

	$(window).resize(function() {
		refresh_cache();
	})

	links.click(function(event) {
		lock = true;
		var target = $($(this).attr("href"))
		animate($(this), target);
		window.location.hash =  target.attr("id");
		$('html, body').scrollTop(target.offset().top - top_margin);
		event.preventDefault();
	});

	checkSectionSelected($(window).scrollTop() + offset);

	$(window).scroll(function(e){
		checkSectionSelected($(window).scrollTop() + offset);
	});
	

	$("pre").hover(
		function() {
			var width = $(this).get(0).scrollWidth;
			if (width > $("#content").width() - 14 && width > $("#content").width()) {
				if (width > pre_width) {
					width = pre_width;
				}
				$(this).css("overflow-x", 'scroll')
				$(this).css("width", width);
			}
		}, 
		function() {
			$(this).css("width", $("#content").width() - 14);
		}
	)
	
	$("pre").each(function() {
		var width = $(this).get(0).scrollWidth;
		if (width > $("#content").width()) {
			$(this).find("code").css("border-bottom", "none");
		}
	});

});