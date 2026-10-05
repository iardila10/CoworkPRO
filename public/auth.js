//Protect the Web

function Protect() {
    const auth = localStorage.getItem("token")

    if(!auth) {
        alert("You have to be registered")
        window.location.href = "../public/start.html"    
    }
}

function logOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    alert("Login out")
    window.location.href = "../public/start.html"
}

Protect()


