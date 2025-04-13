export const deleteProduct = async (productId) => {
    
  
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
      
        throw new Error(data.error || `Error en la petición HTTP: ${response.status}`);
      }
  
      console.log('Producto eliminado exitosamente:', data);
      return data;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  };
  

  deleteProduct(); 
