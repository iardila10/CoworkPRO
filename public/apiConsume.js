import { error } from "node:console"
const registerForm = document.getElementById("registerForm")
const loginForm = document.getElementById("loginForm")


const name = document.getElementById('regName').value;
const email = document.getElementById('regEmail').value;
const password = document.getElementById('regPassword').value;
const company = document.getElementById("regCompany").value;
const phone = document.getElementById("regPhone").value;

//DATOS DEL USUARIO REGISTRADO

const RegisteredDataUser = {
    name: name,
    email: email,
    company: company,
    phone: phone,
    password: password
}

//CONSUMO DE API PARA REGISTRARSE como usuario
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
            document.getElementById("message").textContent = "User registered, redirecting to the menu"
            window.location.href = '..public/main.html'; 
        }
        else {
            document.getElementById('menssage').textContent = data.message || 'Bad request';
        }


    }

    catch (error) {
        document.getElementById('mensaje').textContent = 'Error with the server';
    }

})




//CONSUMO DE API PARA INICIAR SESION