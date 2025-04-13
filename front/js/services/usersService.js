export async function createUser(newUser) {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de respuesta:', errorData);
        throw new Error(errorData.error || 'Error al crear usuario');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear user:', error.message);
      throw error;
    }
  };
  

  export async function getUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`Error en la petición HTTP: ${response.status}`);
      }
  
      return await response.json(); 
    } catch (error) {
      throw new Error(`Error al obtener los usuarios: ${error.message}`);
    }
  };
  

  export async function getUserInfo(userId) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener los datos del usuario: ${response.status}`);
      }
  
      return await response.json(); 
    } catch (error) {
      throw new Error(`Error al obtener los datos del usuario: ${error.message}`);
    }
  };


  export async function updateUser(userId, updatedUser) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('No se puede actualizar el usuario');
      }
  
      return await response.json(); 
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  };

  export async function deleteUser(userId) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  };

  export const logoutUser = async () => {
    const response = await fetch('http://localhost:3000/api/users/logout', {     /// error en la direccion de la ruta :S corregido...
      method: 'POST',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Error al cerrar sesión en el servidor');
    }
  
    return await response.json();
  };