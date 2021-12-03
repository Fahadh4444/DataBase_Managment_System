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


function add(users, id){
    const s = document.getElementById(id);

    for (let i = 0; i < users.length; i++) {
        s.innerHTML += `<span>${users[i].username} <br> ${users[i].email} <br> ${users[i].mobileno}<br><br></span>`;        
    }
}

function insertResult(users,name,id){
    const f = document.getElementById('b');
    console.log(f);
    const n = 500
    const i = Math.floor(Math.random() * 3);
    f.innerHTML +=  `
        <div class="flip flip-vertical" style="margin-top: 1cm;">
            <div class="front" style="background-image: url(https://unsplash.it/500/${n+i}/)">
            <h1 class="text-shadow">${name}</hi>
            </div>
            <div class="back" id = "${id}">
            </div>
        </div>
    `;
    add(users, id);
}


function getDetails(){
    const { user, token } = isAuthenticated();
    fetch(`http://localhost:3000/participants/get/${user.userid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .then((res) =>{
        for (let i = 0; i< res.length; i++) {
            fetch(`http://localhost:3000/chats/users/${res[i].listingid}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
              },
          })
          .then((u) => u.json())
          .then((u) => {
              insertResult(u,res[i].L_category,res[i].listingid);
          })
          .catch((err) => console.log(err))
        }
    })
    .catch((err) => console.log(err))
    console.log("Done");
}


getDetails();