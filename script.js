document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const closeBtns = document.querySelectorAll('.close');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const notificationBell = document.getElementById('notification-bell');
    const notificationPanel = document.getElementById('notification-panel');
    const userDashboard = document.getElementById('user-dashboard');

    // Función para abrir modal
    function openModal(modal) {
        modal.style.display = 'block';
    }

    // Función para cerrar modal
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Función para alternar el modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Función para mostrar/ocultar panel de notificaciones
    function toggleNotifications() {
        notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
    }

    // Función para registrar un usuario
    function registerUser(event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
    
        fetch('register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                closeModal(registerModal);
            } else {
                console.error('Error details:', data);
                alert('Error al registrar: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Hubo un error al registrar el usuario. Por favor, revisa la consola para más detalles.');
        });
    }
    
    // Función para iniciar sesión
    function loginUser(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);

        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                closeModal(loginModal);
                showUserDashboard(data.user);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al iniciar sesión. Por favor, intenta de nuevo.');
        });
    }

    // Función para mostrar el dashboard del usuario
    function showUserDashboard(user) {
        if (userDashboard) {
            userDashboard.style.display = 'block';
            // Aquí puedes actualizar el contenido del dashboard con la información del usuario
            // Por ejemplo:
            // document.getElementById('user-name').textContent = user.name;
        }
        // Ocultar botones de login y registro
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
    }

    // Event Listeners
    if (registerForm) registerForm.addEventListener('submit', registerUser);
    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
    if (registerBtn) registerBtn.addEventListener('click', () => openModal(registerModal));
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    if (notificationBell) notificationBell.addEventListener('click', toggleNotifications);

    // Cerrar modales
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal'));
        });
    });

    // Cerrar modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // Función para cargar el ranking semanal
    function loadWeeklyRanking() {
        fetch('get_ranking.php')
        .then(response => response.json())
        .then(data => {
            const rankingList = document.getElementById('ranking-list');
            rankingList.innerHTML = '';
            data.forEach((analyst, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${analyst.name} - ${analyst.score} puntos`;
                rankingList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cargar el ranking. Por favor, recarga la página.');
        });
    }

    // Cargar ranking al iniciar la página
    loadWeeklyRanking();
});

