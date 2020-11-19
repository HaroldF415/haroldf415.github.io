$(document).ready(function() {

	/*  When #about <li> is clicked page will scroll down to section while turning text inside li white and others black */
	$("#index_about_me_a").click(function() {
	    $('html,body').animate({
	        scrollTop: $(".index_about_me").offset().top - 49},
	        'slow');
	    document.getElementById("index_about_me_a").style.color = "white"; /* When About Me <li> clicked turns it white*/
	    document.getElementById("index_home_a").style.color = "black"; /* When About Me <li> clicked Home <li> turns black */
	    document.getElementById("index_projects_a").style.color = "black"; /* When About Me <li> clicked Projects <li> turns black */
	});

	/* Compensating when #projects <li> is clicked which will trigger the scrolling of the page to said section */
	$("#index_projects_a").click(function() {
	    $('html,body').animate({
	        scrollTop: $(".index_projects").offset().top - 50},
	        'slow');
	    document.getElementById("index_projects_a").style.color = "white";
	    document.getElementById("index_home_a").style.color = "black";
	    document.getElementById("index_about_me_a").style.color = "black";
	});


	/*  SKILLS - SECTION START  */
	$('.index_skill_sub_container').on('click', function(e){

			if($(this).hasClass('selectedDiv')){

				// If this div is the currently selected div:
					// Hide the icons and show the header
				$(this).find('.index_skill_icons').hide();

				$(this).find('.skill_head').show();

				// Remove the selectedDiv class we use to determine if the div is currently selected
				$(this).removeClass('selectedDiv');

			}
			else{

				// If this div is not currently selected:
					// Hide the icons and show the header of the currently selected div
				$('.selectedDiv').find('.index_skill_icons').hide();
				$('.selectedDiv').find('.skill_head').show();

				// Remove the selectedDiv class we used to determine if the div is currently selected
				$('.selectedDiv').removeClass('selectedDiv');

				// Show the icons and hide the header of the newly selected div

				$(this).find('.skill_head').hide();
				$(this).find('.index_skill_icons').show();

				// Add the selectedDiv class we use to determine if the div is currently selected
				$(this).addClass('selectedDiv');
			}

			// Stop event from propagating up the DOM ( So it doesn't trigger the #skillsDiv click event )
			e.stopPropagation();
	});

	$('#index_skills').on('click', function(e){
		$('.skill_head, .index_skill_icons').show();
		$('.index_skill_icons').hide();
	});


	/*  SKILLS - SECTION END */

	/* checking to see if we are on a certain webpage at which time the text inside the li tag will turn white and the others black */
	if(window.location.pathname === '/blog.html') {
     	document.getElementById("blog_menu_a").style.color = "white";
    }
    /* Doing the same as I did ^ up there but will try to figure out a way to find a better solution */
	if(window.location.pathname === '/index.html') {
     	document.getElementById("index_home_a").style.color = "white";
    }

	 if(window.location.pathname === '/cv.html') {
      	document.getElementById("cv_menu_a").style.color = "white";
     }


}); /* ENDS DOCUMENT READY FUNCTION */
