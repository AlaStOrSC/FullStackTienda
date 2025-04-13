const createUser = async () => {
  const userData = {
    nombre: "SuperAdmin",
    email: "superadmin@gmail.com",
    role: "superadmin",
    password: "superadmin123",
    saldoEuros: 100000,
    cuentaBancaria: "ES12232334567890123456789012",
    telefono: "+3466236555444",
    codigoDepartamento: "IT232001",
    codigoPostal: "2238001"
  };

  try {
    console.log('Datos a enviar:', userData);
    const response = await fetch('http://localhost:3000/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Respuesta del servidor:', errorData); // Añadimos esto para más info
      throw new Error(errorData.error || 'Error al crear el usuario');
    }

    const data = await response.json();
    console.log('Usuario creado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

createUser();