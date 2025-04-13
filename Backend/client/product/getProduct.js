export const getProduct = async () => {
    try {
      console.log('Obteniendo lista de productos...');
      
      const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error en la petición HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Lista de productos:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      throw error;
    }
  };
  

  getProduct(); 

export const getProductById = async (productId) => {
    try {
      console.log('Obteniendo producto...');
  
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la petición HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Producto seleccionado:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw error;
    }
  };
  

  getProductById(productId); 


