$(function() {



    // Disable the anchor tags since we will use JavaScript
    $('nav ul li a').on('click', function (e) {
        e.preventDefault();
    });

    //Pull the friend in via ajax, filter, and load them into the UI
    $.get("baby-steps.json", getFriends);

	

    // Click event for navigation
    $('nav ul li').click(customNav);
	
	$('#bs1-link').show();

});

// Toggles the appearance of the content blocks
jQuery(document).ready(function($) {
  $('.resume') .hide()
$('a[href^="#"]').on('click', function(event) {
	$('.resume') .hide()
    var target = $(this).attr('href');
	
    $('.resume'+target).toggle();

});
});

jQuery(document).ready(function($) {
  $('#bs1') .show()
$('a[href^="#"]').on('click', function(event) {
$('.resume') .hide()
    var target = $(this).attr('href');

    $('.resume'+target).toggle();

});
});



// Animation for both the nav list items as well as content blocks fade animation
function customNav (e) {
    $('nav ul li').removeClass("selected");
    $(e.currentTarget).toggleClass("selected");
    $('.step-icon-secondary-sm').show();
    $('.step-icon-primary-sm').hide();
    $(this).find('.step-icon-secondary-sm').hide();
    $(this).find('.step-icon-primary-sm').show();	
	    var linkID = '#' + $(e.currentTarget).attr('id');

	
	    $('#background').animate({
        top: $(linkID).offset().top - 336
    }, 1000, function() {
        $('.icon-primary').animate({ opacity: 1 });
			$('.resume').animate({opacity:1}, 50);
    });
	
	    $('.icon-primary').animate({ opacity: 0 }, 50);
		$('.resume').animate({opacity: 0}, 50);
}





// Use AJAX to get the friends data from JSON file
function getFriends(data) {

    // Loop and filter information
    for (i = 1; i <= 7; i++) {

        var filteredFriends = $.grep(data.friends, function(n) {
            return n.babyStep == i;
        });

        $('#bs' + i + ' p.friends').html(getFriendHtml(i, filteredFriends));
    }
}

function getFriendHtml(step, friendsInStep) {

    var names = ""
    var numFriends = friendsInStep.length;

    for (f = 0; f< numFriends; f++) {
        if(f < 2) {
            names = names + "<span class='name'>" + friendsInStep[f].firstName + " " + friendsInStep[f].lastName + "</span>";
        }

        if (f == 0 || f == 1) {
            //names += " ";
            if (numFriends == 2 && f== 0) {
                names += " and ";
            }
        }
        if (numFriends > 2 && f== 0) {
            names += ", ";
        }
    }

    // Set the correct text in between queries
    if (numFriends > 0) {
        var isAre = " are";
        var addlFriends = "";
        var pluralFriends = "s";

        if(numFriends == 3) {
            pluralFriends = ""
        }

        if (numFriends == 1) {
            isAre = " is";
            pluralFriends = ""
        }
        else if (numFriends > 2) {
            addlFriends = " and " + (numFriends - 2) + " other friend" + pluralFriends + "  ";
        }

        names += addlFriends + isAre + " also in Baby Step " + step;
        return names;
    }
}