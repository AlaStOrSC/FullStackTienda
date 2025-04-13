const updateUser = async () => {
  // Ejemplo de un ObjectId de MongoDB (24 caracteres hexadecimales)
  const userId = '65f9e8b7c261e8b7c261e8b7'; // Reemplaza con el ObjectId real del usuario a actualizar
  
  const userData = {
    nombre: "Usuario Actualizado",
    email: "actualizado@ejemplo.com",
    saldoEuros: 2000,
    cuentaBancaria: "ES9876543210987654321098",
    telefono: "+34987654321",
    codigoDepartamento: "IT002",
    codigoPostal: "28002"
  };

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error en la petición HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Usuario actualizado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
updateUser(); 