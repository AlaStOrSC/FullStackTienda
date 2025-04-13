const creatProduct = async () => {
    const productData = {
        nombre: "Mouse Inalámbrico Ergonómico",
        descripcion: "Mouse inalámbrico con diseño ergonómico, batería recargable y múltiples niveles de DPI",
        precio: 59.99,
        stock: 50,
        categoria: "Periféricos",
        marca: "ErgoTech",
        codigoProducto: "MOU-305",
        fechaFabricacion: "2024-02-10",
        garantiaMeses: 12,
        peso: 0.3,
        dimensiones: { 
            "alto": 4, 
            "ancho": 10, 
            "profundidad": 7 
        },
        coloresDisponibles: ["Gris", "Azul"],
        etiquetas: ["mouse", "inalámbrico", "ergonómico"],
        imagenes: ["mouse1.jpg", "mouse2.jpg"],
        esActivo: true
    };
      
    try {
        console.log('Enviando datos:', productData);
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de respuesta:', errorData);  
            throw new Error(errorData.error || 'Error al crear producto');
        }

        const data = await response.json();
        console.log('Producto creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear producto:', error.message);  
        console.error(error); 
        throw error;
    }
};

creatProduct();
