const getUsers = async () => {
  try {
    console.log('Obteniendo lista de usuarios...');
    
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error en la petición HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Lista de usuarios:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
getUsers(); 