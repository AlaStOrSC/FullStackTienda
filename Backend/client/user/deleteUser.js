const deleteUser = async () => {
  // Ejemplo de un ObjectId de MongoDB (24 caracteres hexadecimales)
  const userId = '67e440ec6f3c3050b491ed7d'; // Reemplaza con el ObjectId real del usuario a eliminar

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error en la petición HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Usuario eliminado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
deleteUser(); 