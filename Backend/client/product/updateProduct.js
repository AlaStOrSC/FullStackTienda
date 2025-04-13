export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error en la petición HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Producto actualizado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};


