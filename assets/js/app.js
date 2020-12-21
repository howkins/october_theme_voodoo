
var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};
var keepFooter = function(documentHasScroll){
    if(documentHasScroll){
        document.getElementById("layout-footer").classList.remove('fixed-bottom');
    }else{
        document.getElementById("layout-footer").classList.add('fixed-bottom');
    }
}

$(document).ready(function() {
	var loggedInMenuNavbar = $('.navbar-loggedin-user');
	loggedInMenuNavbar.find('#menu').removeAttr('id');
});

function isBreakpointLarge(){
    return window.innerWidth <= 991;
}

function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function cardCarousel(object){
    return new Promise(resolve => {
        $('#card-carousel').slick(object);
        resolve()
    });
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarLogin');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarLogin');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function initAccordeon(pElem) {
	$('body').on('click', '.accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});
}

function init() {
    window.addEventListener('resize', function () {
        keepFooter(documentHasScroll());
        if (isBreakpointLarge()){
            $('#card-carousel').slick('unslick');
        }else{
            cardCarousel({
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
				autoplaySpeed: 6000,
				prevArrow: '<i class="slick-prev p p-back"/>',
				nextArrow: '<i class="slick-next p p-forward"/>',
            });
        }
    });
    document.addEventListener('DOMContentLoaded', function () {
        onLoadedDomContent();
    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

async function onLoadedDomContent(){
    if (!isBreakpointLarge()) {
        await cardCarousel({
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
			autoplaySpeed: 6000,
			prevArrow: '<i class="slick-prev pr p-back"/>',
			nextArrow: '<i class="slick-next pr p-forward"/>',
        });
    }
    keepFooter(documentHasScroll());
}

init()