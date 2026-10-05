import { error } from "node:console"
const registerForm = document.getElementById("registerForm")
const loginForm = document.getElementById("loginForm")


const name = document.getElementById('regName').value;
const email = document.getElementById('regEmail').value;
const password = document.getElementById('regPassword').value;
const company = document.getElementById("regCompany").value;
const phone = document.getElementById("regPhone").value;

//REGISTERED USER DATA
const RegisteredDataUser = {
    name: name,
    email: email,
    company: company,
    phone: phone,
    password: password
}

//LOGGED USER DATA

const LoggedDataUser = {
    email: email,
    password: password
}

//API CONSUMPTION TO REGISTER as a user
registerForm.addEventListener("submit", async (event) => {

    try {
        const req = await fetch("http://localhost:8000/register" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RegisteredDataUser)
        })

        const res = req.json()

        if (req.ok && RegisteredDataUser.success) {
            document.getElementById("message").textContent = "User registered, redirecting to the login"
        }
        else {
            document.getElementById('menssage').textContent = data.message || 'Bad request';
        }


    }

    catch (error) {
        document.getElementById('mensaje').textContent = 'Error with the server';
    }

})



//API CONSUMPTION TO LOG IN

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    try {
        const req = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(LoggedDataUser)
        })

        if (req.ok && LoggedDataUser.success) {
            document.getElementById("message").textContent = "User registered, redirecting to the menu"
            window.location.href = "../public/main.html"
        }
    }

    catch (error) {
        document.getElementById('mensaje').textContent = 'Error with the server';
    }


})