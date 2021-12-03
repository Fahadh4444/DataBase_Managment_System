function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});

const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}

function insertLists(res){
    const n = 500
    const { user, token } = isAuthenticated();
    const {userid} = user;
    console.log(userid);
    const req = document.getElementById('req');
    for (let i = 0; i < res.length; i++) {
        console.log(res[i].userid);
        if(userid == res[i].userid){
            req.innerHTML += `
            <div class="col" ontouchstart="this.classList.toggle('hover');" id = "${res[i].userid}">
                <div class="container">
                    <div class="front" style="background-image: url(https://unsplash.it/500/${n+i}/)">
                        <div class="inner">
                          <p>${res[i].L_category}</p>
                          <span>Subscription Price: ₹ ${(res[i].L_share) * (res[i].L_count)}</span><br>
                          <span>Share Count: ${res[i].L_count}</span><br>
                          <span>Price Share: ₹ ${res[i].L_share}</span><br>
                          <span>Accepted Count: ${res[i].L_accepted}</span><br>
                        </div>
                    </div>
                    <div class="back">
                        <div class="inner">
                            <p>${res[i].L_content}</p>
                        </div>
                        <button class="button button2" id="b${res[i].listingid}" onClick = "deletelisting(id)"><a>Delete</a></button>
                    </div>
                </div>
            </div>
            `;
        }
    }
}

function getAllListings(){
    const { user, token } = isAuthenticated();
    fetch("http://localhost:3000/lists/getalllistings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        insertLists(res);
    })
    .catch((err) => console.log(err));
}

function deletelisting(id){
    const { user, token } = isAuthenticated();
    fetch(`http://localhost:3000/lists/delete/${id.substring(1)}/${user.userid}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .then((res) => {
        console.log("Successfully Deleted!!!");
        console.log(res);
    })
    .catch((err) => console.log(err));
    location.reload();
    setTimeout(1000);
    getAllListings(0);
}

getAllListings();