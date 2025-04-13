import { createUser, getUsers, getUserInfo, updateUser, deleteUser, logoutUser } from './services/usersService.js';
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/verify-token', {
      credentials: 'include', 
    });

    if (!response.ok) {
      console.log('No autenticado, redirigiendo a login');
      window.location.href = 'index.html';
      return;
    }

    const authData = await response.json();
    if (!authData.authenticated) {
      console.log('Token inválido, redirigiendo a login');
      window.location.href = 'index.html';
      return;
    }

    console.log('Usuario autenticado correctamente');

  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    window.location.href = 'index.html';
  };

  console.log('Token encontrado, usuario autenticado');

  const showUsersBtn = document.getElementById('showUsersBtn');
  const usersModal = document.getElementById('usersModal');
  const closeModalBtn = document.getElementById('closeUsersModalBtn');
  const usersTableBody = document.getElementById('usersTableBody');
  const name = document.getElementById('nombre');
  const email = document.getElementById('email');
  const role = document.getElementById('role');
  const balance = document.getElementById('saldoEuros');
  const bankAccount = document.getElementById('cuentaBancaria');
  const telephone = document.getElementById('telefono');
  const depCode = document.getElementById('codigoDepartamento');
  const postalCode = document.getElementById('codigoPostal');
  const userUpdateFormContainer = document.getElementById('userUpdateFormContainer');
  const userUpdateForm = document.getElementById('userUpdateForm');
  const createUserModal = document.getElementById('createUserModal');
  const createUserBtn = document.getElementById('createUserBtn');
  const createUserForm = document.getElementById('createUserForm');
  const nombreInput = document.getElementById('nombreC');
  const emailInput = document.getElementById('emailC');
  const roleInput = document.getElementById('roleC');
  const password = document.getElementById('passwordC');
  const saldoEurosInput = document.getElementById('saldoEurosC');
  const cuentaBancariaInput = document.getElementById('cuentaBancariaC');
  const telefonoInput = document.getElementById('telefonoC');
  const codigoDepartamentoInput = document.getElementById('codigoDepartamentoC');
  const codigoPostalInput = document.getElementById('codigoPostalC');
  const logoutBtn = document.getElementById('logoutBtn');
  

  let currentUserId = null;

  createUserBtn.addEventListener('click', () => {
    createUserModal.style.display = 'flex';
  })

  createUserModal.addEventListener('click', (event) => {
    if (event.target === createUserModal) {
      createUserModal.style.display = 'none';
    }
  })

  showUsersBtn.addEventListener('click', () => {
    usersModal.style.display = 'flex';
  })

  closeModalBtn.addEventListener('click', () => {
    usersModal.style.display = 'none';
  })

  usersModal.addEventListener('click', (event) => {
    if (event.target === usersModal) {
      usersModal.style.display = 'none';
    }
  })
  showUsersBtn.addEventListener('click', showAllUsers);

  createUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const newUser = {
      nombre: nombreInput.value,
      email: emailInput.value,
      role: roleInput.value,
      password: password.value,
      saldoEuros: saldoEurosInput.value,
      cuentaBancaria: cuentaBancariaInput.value,
      telefono: telefonoInput.value,
      codigoDepartamento: codigoDepartamentoInput.value,
      codigoPostal: codigoPostalInput.value,
    };
    for (const key in newUser) {
      if (!newUser[key] || newUser[key].trim() === "") {
        alert(`El campo "${key}" es obligatorio`);
        return; 
      }
    }
    try {
  
      await createUser(newUser);
      alert(`Bienvenido ${newUser.nombre}, has creado tu usuario con éxito`);
      createUserModal.style.display = 'none';
    } catch (error) {
      alert('Ocurrió un error al crear el usuario: ' + error.message);
    }
  });

  logoutBtn.addEventListener('click', async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
    window.location.href = 'index.html';
  });

  async function showAllUsers() {
    try {
      usersModal.style.display = 'flex';
  
      const users = await getUsers(); 
  
      let tableRows = '';
  
      users.forEach((user) => {
        tableRows += `
          <tr>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.saldoEuros}</td>
            <td>${user.cuentaBancaria}</td>
            <td>${user.telefono}</td>
            <td>${formatDate(user.fechaAlta)}</td>
            <td>${user.codigoDepartamento}</td>
            <td>${user.codigoPostal}</td>
            <td>
              <button class='updateBtn' data-id='${user._id}'>
                <i class='fas fa-edit'></i> Actualizar
              </button>
              <button class='deleteBtn' data-id='${user._id}'>
                <i class='fas fa-trash'></i> Eliminar
              </button>
            </td>
          </tr>
        `;
      });
  
      usersTableBody.innerHTML = tableRows;
  
      const deleteButtons = document.querySelectorAll('.deleteBtn');
      const updateButtons = document.querySelectorAll('.updateBtn');
  
      deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const userId = button.getAttribute('data-id');
          handleDeleteUser(userId);
        });
      });
  
      updateButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const userId = button.getAttribute('data-id');
          showUpdateForm(userId);
        });
      });
    } catch (error) {
      console.error('Error:', error);
      usersTableBody.innerHTML = `No se pudieron cargar los usuarios. Error: ${error.message}`;
    }
  }

  async function handleDeleteUser(userId) {
    try {

      const data = await deleteUser(userId);

      alert(data.message);

      const button = document.querySelector(`.deleteBtn[data-id='${userId}']`);
      if (button) {
        const row = button.closest('tr');
        row.remove();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario:' + error.message);
    }
  };

  async function showUpdateForm(userId) {
    try {
      
      const user = await getUserInfo(userId);

      name.value = user.nombre;
      email.value = user.email;
      role.value = user.role
      balance.value = user.saldoEuros;
      bankAccount.value = user.cuentaBancaria;
      telephone.value = user.telefono;
      depCode.value = user.codigoDepartamento;
      postalCode.value = user.codigoPostal;

      userUpdateFormContainer.style.display = 'block';
      currentUserId = userId;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      alert('Error al obtener los datos del usuario' + error.message);
    }
  }

  userUpdateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedUser = {
      nombre: name.value,
      email: email.value,
      role: role.value,
      saldoEuros: balance.value,
      cuentaBancaria: bankAccount.value,
      telefono: telephone.value,
      codigoDepartamento: depCode.value,
      codigoPostal: postalCode.value,
    }

    try {
      const data = await updateUser(currentUserId, updatedUser);

      alert(data.message);

      userUpdateFormContainer.style.display = 'none';
      showAllUsers();
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
      alert('Error al actualizar el usuario:' + error.message);
    }

  })

  function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  };
});












