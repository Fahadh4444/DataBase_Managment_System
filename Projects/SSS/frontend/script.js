const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signinf = document.getElementById('signinf');
const signupf = document.getElementById('signupf');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function signup() {
    username = $('#name').val();
    email = $('#email').val();
    mobileno = $('#mobile').val();
    dob = $('#dob').val();
    password = $('#password').val();

    user = {
        username,
        email,
        mobileno,
        dob,
        password
    };

    fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .then(response => {
        console.log(response);
        if(!response.errno){
            signupf.reset();
            signInButton.click();
        }else{
            alert("Something went wrong with data you filled !!!");
        }
    })
    .catch(err => {
        alert("Something went wrong with data you filled !!!");
    });

}


function authenticate(){
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
    }
}


function signin() {
    username = $('#sname').val();
    password = $('#spassword').val();

    user = {
        username,
        password
    }

    fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .then(response => {
        if(!response.err){
            if (typeof window !== "undefined") {
                localStorage.setItem("jwt", JSON.stringify(response));
            };
            console.log("Successfully Logged In !!!");
            window.location.href="./homepage/home.html"
        }else{
            alert("Credentials are Incorrect !!!");
        }
        
    })
    .catch(err => {
        alert("Something Went Wrong!!!");
        console.log(err)
    });
}