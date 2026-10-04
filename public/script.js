 // State management variables
        let currentMode = 'login'; // 'login' or 'register'
        let currentRole = 'user';  // 'user' or 'admin'

        function switchMode(mode) {
            currentMode = mode;
            const tabLogin = document.getElementById('tabLogin');
            const tabRegister = document.getElementById('tabRegister');
            const tabIndicator = document.getElementById('tabIndicator');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const portalTitle = document.getElementById('portalTitle');
            const portalSubhead = document.getElementById('portalSubhead');

            if (mode === 'login') {
                tabLogin.classList.add('active');
                tabRegister.classList.remove('active');
                tabIndicator.style.left = '3px';

                loginForm.classList.remove('form-hidden');
                loginForm.classList.add('form-visible');
                registerForm.classList.remove('form-visible');
                registerForm.classList.add('form-hidden');

                portalTitle.innerText = "¡Bienvenido de nuevo! 👋";
                portalSubhead.innerText = "Ingresa a tu cuenta para gestionar o reservar tus espacios";
            } else {
                tabRegister.classList.add('active');
                tabLogin.classList.remove('active');
                tabIndicator.style.left = 'calc(50% + 3px)';

                registerForm.classList.remove('form-hidden');
                registerForm.classList.add('form-visible');
                loginForm.classList.remove('form-visible');
                loginForm.classList.add('form-hidden');

                portalTitle.innerText = "Crear nueva cuenta ✨";
                portalSubhead.innerText = "Únete a la plataforma líder en alquiler y reserva de espacios";
            }

            updateButtonLabels();
        }

        function setRole(role) {
            currentRole = role;
            const roleUser = document.getElementById('roleUser');
            const roleAdmin = document.getElementById('roleAdmin');
            const adminFieldContainer = document.getElementById('adminFieldContainer');

            if (role === 'user') {
                roleUser.classList.add('active');
                roleAdmin.classList.remove('active');
                adminFieldContainer.classList.add('hidden');
            } else {
                roleAdmin.classList.add('active');
                roleUser.classList.remove('active');
                adminFieldContainer.classList.remove('hidden');
            }

            updateButtonLabels();
        }

        function updateButtonLabels() {
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');

            const roleText = currentRole === 'user' ? 'Cliente' : 'Anfitrión';

            if (loginBtn) {
                loginBtn.querySelector('span').innerText = `Iniciar Sesión como ${roleText}`;
            }
            if (registerBtn) {
                registerBtn.querySelector('span').innerText = `Crear Cuenta de ${roleText}`;
            }
        }

        function togglePasswordVisibility(inputId, iconId) {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        function handleAuthSubmit(event, formType) {
            event.preventDefault();

            const roleName = currentRole === 'user' ? 'Client' : 'Admin';
            const actionText = formType === 'login' ? 'Inicio de sesión exitoso' : 'Registro completado';

            showToast(`¡${actionText}! Has ingresado como ${roleName}.`, 'success')

            
            // Here you can integrate with your Backend endpoint via fetch/Axios
            /*
            fetch(`/api/auth/${formType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: currentRole, ... })
            })
            */
        }

        // public/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Verificar si el usuario ya está autenticado al cargar la página
    verificarSesionActiva();

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Limpiar mensajes de error previos
            if (errorMessage) errorMessage.textContent = '';

            // Capturar los datos del formulario basados en tus inputs del HTML
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                mostrarError('Por favor, completa todos los campos.');
                return;
            }

            try {
                // Consumo de la API de autenticación en el Backend
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    // Si el servidor responde con un error (401, 400, etc.), lanzamos la excepción
                    throw new Error(data.error || 'Error al iniciar sesión. Inténtalo de nuevo.');
                }

                // Guardar la sesión de forma segura en el navegador
                localStorage.setItem('token', data.token);
                localStorage.setItem('rol', data.rol);
                localStorage.setItem('nombre', data.nombre);

                // Redirección dinámica basada en el Rol devuelto por la Base de Datos
                redirigirSegunRol(data.rol);

            } catch (error) {
                console.error('Error de Autenticación:', error);
                mostrarError(error.message);
            }
        });
    }
});

/**
 * Función encargada de enviar al usuario a su panel correspondiente
 * @param {string} rol - El rol del usuario ('ADMIN' o 'USER')
 */
function redirigirSegunRol(rol) {
    if (rol === 'ADMIN') {
        window.location.href = '/dashboard.html'; // O la ruta de tu portal administrador
    } else if (rol === 'USER') {
        window.location.href = '/main.html'; // Portal estándar de usuario/coworker
    } else {
        window.location.href = '/start.html'; // Caída por defecto si no hay rol claro
    }
}

/**
 * Comprueba si hay un token válido guardado para evitar que un usuario logueado vuelva a ver el login
 */
function verificarSesionActiva() {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    // Si ya existe una sesión en este navegador, redirigimos automáticamente al panel correspondiente
    if (token && rol) {
        redirigirSegunRol(rol);
    }
}

/**
 * Muestra el error en la interfaz de usuario de forma elegante
 * @param {string} mensaje 
 */
function mostrarError(mensaje) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = mensaje;
        // Opcional: Si implementas las clases de animación que tenías en tu CSS, puedes dispararlas aquí
        errorMessage.classList.add('animate-bounce'); 
    } else {
        alert(mensaje); // Caída de emergencia si el nodo DOM no se encuentra
    }
}


        function socialLogin(provider) {
            showToast(`Conectando con ${provider}...`, 'info');
        }

        function showToast(msg, type = 'info') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = document.getElementById('toastIcon');

            toastMessage.innerText = msg;

            if (type === 'success') {
                toastIcon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
            } else if (type === 'error') {
                toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose-400"></i>';
            } else {
                toastIcon.innerHTML = '<i class="fa-solid fa-circle-info text-indigo-400"></i>';
            }

            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }
