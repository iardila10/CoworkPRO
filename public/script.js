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
