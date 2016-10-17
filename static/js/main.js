console.log("Hi Girl Coder, please make sure you join our community at meetup.com/GirlCode. Boys are welcome too!");

$(document).ready(function() {
	$('.social-button, .social-button-footer').mouseenter(function() {
		$(this).effect( 'bounce', { times: 1 }, 'slow');

	});
});

// slow scroll to content
$(document).ready(function() {
	var fullUrl= $(location).attr('href');
	var hashPresent = fullUrl.match('\\?(.*)');	
	if (hashPresent[0][0] === "?" ) {
		$('html, body').animate({
			scrollTop: $('#' + hashPresent[1]).offset().top -150
		}, 1250);
		return false;
	}	
})

$('.scroll').click(function(event){
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $( $.attr(this,'href') ).offset().top -150
	}, 1250);
	return false;
});

// fade in and out background image landingspage
$(function(){
	var t = setInterval(function(){

		$('.bg-image').last().fadeOut(2000,function(){
			$this = $(this);
			$parent = $this.parent();
			$this.remove().css('display','block');
			$parent.prepend($this);
		});

	},3500);
});

$(document).ready(function() {
	$('.contact-cta, .cta-join-container').mouseenter(function(){
		$(this).effect( 'bounce', { distance: 10, times: 1 }, 'slow');
	});

	$('.contact-social-element').children().mouseenter(function() {
		$(this).children('img').effect( 'bounce', { times: 1 }, 'slow');
	});	

	$('.social-button, .social-button-footer').mouseenter(function() {
		$(this).effect( 'bounce', { times: 1 }, 'slow');
	});
});

// =CONTACT-PAGE MEETUP API REQUEST
// =INPUTS
var urls = [];

// members
urls[0] = "https://api.meetup.com/girlcode?photo-host=public&sig_id=196092929&sig=ca1b24075a0729853813027c08cb66ade21c6443";

// upcoming events
urls[1] = "https://api.meetup.com/girlcode/events?photo-host=public&page=5&sig_id=196092929&sig=d38879607cf337c44247f12416ef86764e69bef4";

// past events
urls[2] = "https://api.meetup.com/girlcode/events?photo-host=public&page=5&sig_id=196092929&status=past&sig=6f8ac70249c033f498e01394ae5e9bb50526571c";

// TEST URL
// urls[1] = 'https://api.meetup.com/ocamsterdam/events?photo-host=public&page=5&sig_id=196092929&sig=1f20a3049b0ce2de8d1341dffa1d6c32323f879e';
// capped at 5 upcoming/past events, edit page=5 in url for to increase/decrease.

// =REQUESTS
for (var i = 0, requests = [], requestsJSON = []; i < urls.length; i++) {
	requests[i] = new XMLHttpRequest();
	requests[i].onreadystatechange = processMeetupData;
	requests[i].open ("GET", urls[i], false);
	requests[i].withCredentials = true;
	requests[i].send();
}

// =JSON PARSING
function processMeetupData () {
	if (this.readyState == 4 && this.status == 200) {
		requestsJSON[i] = JSON.parse(this.responseText);
	}
}

// =DATA TO HTML
if (document.getElementsByClassName('cta-join-members')[0]) {
	document.getElementsByClassName('cta-join-members')[0].innerHTML = requestsJSON[0].members;
}

if (document.getElementsByClassName('calendar-container')[0]) {
	for (var x = 0, z = 5, y = requestsJSON[2].length - 1, dateString = '', 
		eventLinks = document.getElementsByClassName('event-link'),
		eventNames = document.getElementsByClassName('event-name'),
		eventDays = document.getElementsByClassName('event-day'),
		eventTimes = document.getElementsByClassName('event-time'),
		eventVenueNames = document.getElementsByClassName('event-venue-name'),
		// eventGoings = document.getElementsByClassName('event-going'),
		eventDates = document.getElementsByClassName('event-date'),
		eventMonths = document.getElementsByClassName('event-month');
		x < requestsJSON[1].length, y >= 0; z++, y--, x++) {
		
		if(requestsJSON[1][x]) {
			dateString = String(new Date(requestsJSON[1][x]['time']));
			eventNames[x].innerHTML = requestsJSON[1][x]['name'];
			eventLinks[x].href = requestsJSON[1][x]['link'];
			eventDays[x].innerHTML = dateString.slice(0,3);
			eventTimes[x].innerHTML = dateString.slice(16,21);
			eventVenueNames[x].innerHTML = requestsJSON[1][x]['venue']['name'];
			// eventGoings[x].innerHTML = requestsJSON[1][x]['yes_rsvp_count'] + ' going';
			eventDates[x].innerHTML = dateString.slice(8,10);
			eventMonths[x].innerHTML = dateString.slice(4,7);
			document.getElementsByClassName('event-coming-soon')[0].style.display = "none";
		}

		if(requestsJSON[2][y]) {
			dateString = String(new Date(requestsJSON[2][y]['time']));
			eventNames[z].innerHTML = requestsJSON[2][y]['name'];
			eventLinks[z].href = requestsJSON[2][y]['link'];
			// eventDays[x].innerHTML = dateString.slice(0,3);
			eventTimes[z].innerHTML = dateString.slice(16,21);
			eventVenueNames[z].innerHTML = requestsJSON[2][y]['venue']['name'];
			// eventGoings[x].innerHTML = requestsJSON[2][y]['yes_rsvp_count'] + ' going';
			eventDates[z].innerHTML = dateString.slice(8,10);
			eventMonths[z].innerHTML = dateString.slice(4,7);
		}
	}	
};
