//Protect the Web

function Protect() {
    const auth = localStorage.getItem("auth")

    if(!auth) {
        alert("You have to be registered")
        window.location.href = "../public/start.html"    
    }
}

function logOut() {
    localStorage.removeItem("auth")
    localStorage.removeItem("user")
    alert("Login out")
    window.location.href = "../public/main.html"
}

//Protect()
