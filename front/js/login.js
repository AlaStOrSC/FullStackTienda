document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  function checkCookies() {
    console.log('Todas las cookies:', document.cookie);
  }

  checkCookies()

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userCredentials = {
      email: emailInput.value,
      password: passwordInput.value,
    }

    try {

      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
        credentials: 'include',
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el inicio de sesion');
      }

      const data = await response.json();
      console.log('Datos de respuesta:', data);


      setTimeout(() => {
        console.log('Cookies despues del login:', document.cookie);
        alert('Inicio de sesion exitoso');
        window.location.href = 'users.html'
      }, 500);
    } catch (error) {
      console.error('Error al iniciar sesion:', error);
      alert('Credenciales incorrectas o error en el servidor.');
    }
  });
});

