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
    var count = 0
    const req = document.getElementById('req');
    for (let i = 0; i < res.length; i++) {
        if(res[i].L_accepted < res[i].L_count && res[i].L_category == "Curiosity Stream"){
            count = count + 1;
            req.innerHTML += `
            <div class="col" ontouchstart="this.classList.toggle('hover');" id = "${res[i].listingid}">
                <div class="container">
                    <div class="front" style="background-image: url(https://unsplash.it/${n+i}/500/)">
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
                        <button class="button button2" id="b${res[i].listingid}" onClick = "accept(id)"><a>Accept</a></button>
                    </div>
                </div>
            </div>
            `;
        }
    }
    if(count == 0){
        req.innerHTML = "<h1>No Curiosity Stream Listings Posted !!!</h1>";
    }
}

function getAllListings(f){
    let r = []
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
        if(f == 0){
            insertLists(res);
        }
        if(f == 1){
            cat = $('#searchs').val();
            console.log(cat);
            insertSLists(res, cat);
        }
    })
    .catch((err) => console.log(err));
    return r;
}

// function accept(id) {
//     console.log(id);
//     const { user, token } = isAuthenticated();
//     fetch(`http://localhost:3000/lists/update/${id.substring(1)}`, {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`
//         },
//     })
//     .then((res) => res.json())
//     .then((res) => {
//         console.log("Success!!!");
//         console.log(res);
//         if(res.msg){
//             fetch(`http://localhost:3000/participants/add/${id.substring(1)}/${user.userid}`, {
//                 method: "POST",
//                 headers: {
//                   Authorization: `Bearer ${token}`
//               },
//             })
//             .then((r) => {
//                 console.log("Added Successfully!!!");
//             })
//             .catch((err) => console.log(err))
//         }
//     })
//     .catch((err) => console.log(err));
//     location.reload();
//     setTimeout(1000);
//     getAllListings();
// }

function accept(id) {
    console.log(id);
    const { user, token } = isAuthenticated();
    fetch(`http://localhost:3000/lists/update/${id.substring(1)}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .then((res) => {
        console.log("Success!!!");
        console.log(res);
        if(res.msg && (res.L_accepted < res.L_count)){
            fetch(`http://localhost:3000/participants/add/${id.substring(1)}/${user.userid}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`
              },
            })
            .then((r) => {
                console.log("Added Successfully!!!");
            })
            .catch((err) => console.log(err))
        }
        if(res.msg && (res.L_accepted+1 >= res.L_count)){
            window.location.href = "../../listings/chat/chat.html"
        }
    })
    .catch((err) => console.log(err));
    location.reload();
    setTimeout(1000);
    getAllListings();
}


function insertSLists(res, cat){
    const req = document.getElementById('req');
    req.innerHTML = "<br>";
    console.log(req.innerHTML);
    for (let i = 0; i < res.length; i++) {
        if((res[i].L_accepted < res[i].L_count)){
            if(cat == res[i].L_category){
                req.innerHTML += `
                <div class="col" ontouchstart="this.classList.toggle('hover');" id = "${res[i].listingid}">
                    <div class="container">
                        <div class="front" style="background-image: url(https://unsplash.it/500/500/)">
                            <div class="inner">
                            <p>${res[i].L_category}</p>
                            <span>Subscription Price: ₹ ${(res[i].L_share) * (res[i].L_count)}</span><br>
                            <span>Price Share: ₹ ${res[i].L_share}</span><br>
                            <span>Share Count: ₹ ${res[i].L_count}</span><br>
                            <span>Accepted List: ${res[i].L_accepted}</span><br>
                            </div>
                        </div>
                        <div class="back">
                            <div class="inner">
                                <p>${res[i].L_content}</p>
                            </div>
                            <button class="button button2" id="b${res[i].listingid}" onClick = "accept(id)"><a>Accepted</a></button>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }
}



function search(e){
    if(event.keyCode === 13){
        getAllListings(1);
    }

}


getAllListings(0);