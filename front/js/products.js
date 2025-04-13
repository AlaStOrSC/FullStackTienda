document.addEventListener('DOMContentLoaded', async function () {
  
    try {
       
        const response = await fetch('/api/users/verify-token', {
          credentials: 'include', 
        })
    
        if (!response.ok) {
       
          console.log('No autenticado, redirigiendo a login')
          window.location.href = 'index.html'
          return
        }
    
        const authData = await response.json()
        if (!authData.authenticated) {
          console.log('Token inválido, redirigiendo a login')
          window.location.href = 'index.html'
          return
        }
    
        console.log('Usuario autenticado correctamente')
    
     
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
        window.location.href = 'index.html'
      }

    const showProductsBtn = document.getElementById('showProductsBtn');
    const productsModal = document.getElementById('productsModal');
    const productsTableBody = document.getElementById('productsTableBody');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const productUpdateFormContainer = document.getElementById('productUpdateFormContainer');
    const productUpdateForm = document.getElementById('productUpdateForm');
    const name = document.getElementById('nombre');
    const description = document.getElementById('descripcion');
    const price = document.getElementById('precio');
    const stock = document.getElementById('stock');
    const category = document.getElementById('categoria');
    const branch = document.getElementById('marca');
    const productCode = document.getElementById('codigoProducto');
    const garanty = document.getElementById('garantiaMeses');
    const avaliableColors = document.getElementById('coloresDisponibles');
    const createProductBtn = document.getElementById('createProductBtn');
    const createProductContainer = document.getElementById('createProductContainer');
    const createProductForm = document.getElementById('createProductForm');

    let currentProductId = null;

    showProductsBtn.addEventListener('click', showAllProducts);
    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function (event) {
        if (event.target === productsModal) {
            closeModal();
        }
    });

    async function showAllProducts() {
        try {
            productsModal.style.display = 'flex';

            const response = await fetch('/api/products');

            if (!response.ok) {
                throw new Error(`Error en la petición HTTP: ${response.status}`);
            }

            const products = await response.json();

            let tableRows = '';

            products.forEach((product) => {
                tableRows += `
                    <tr>
                        <td>${product.nombre || 'No hay datos'}</td>
                        <td>${product.descripcion ? product.descripcion.substring(0, 30) + '...' : 'No hay datos'}</td>
                        <td>${product.precio? `$${product.precio.toFixed(2)}` : 'No hay datos'}</td>
                        <td>${product.stock ? product.stock : 'No hay datos'}</td>
                        <td>${product.categoria || 'No hay datos'}</td>
                        <td>${product.marca || 'No hay datos'}</td>
                        <td>${product.codigoProducto || 'No hay datos'}</td>
                        <td>${product.garantiaMeses ? `${product.garantiaMeses} meses` : 'No hay datos'}</td>
                        <td>${product.coloresDisponibles ? product.coloresDisponibles.join(', ') : 'No hay datos'}</td>
                        <td>
                            <button class='updateBtn' data-id='${product._id}'>
                                <i class='fas fa-edit'></i> Actualizar
                            </button>
                            <button class='deleteBtn' data-id='${product._id}'>
                                <i class='fas fa-trash'></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });

            productsTableBody.innerHTML = tableRows;

            const deleteButtons = document.querySelectorAll('.deleteBtn');
            const updateButtons = document.querySelectorAll('.updateBtn');

            deleteButtons.forEach((button) => {
                button.addEventListener('click', function () {
                    const productId = button.getAttribute('data-id');
                    deleteProduct(productId);
                });
            });

            updateButtons.forEach((button) => {
                button.addEventListener('click', function () {
                    const productId = button.getAttribute('data-id');
                    showUpdateForm(productId);
                });
            });
        } catch (error) {
            console.error('Error:', error);
            productsTableBody.innerHTML = `No se pudieron cargar los productos. Error: ${error.message} `;
        }
    }

    async function showUpdateForm(productId) {
        try {
            const response = await fetch(
                `/api/products/${productId}`
            );
            const product = await response.json();

            name.value = product.nombre;
            description.value = product.descripcion;
            price.value = product.precio;
            stock.value = product.stock;
            category.value = product.categoria;
            branch.value = product.marca;
            productCode.value = product.codigoProducto;
            garanty.value = product.garantiaMeses;
            avaliableColors.value = product.coloresDisponibles
                ? product.coloresDisponibles.join(', ')
                : '';

            productUpdateFormContainer.style.display = 'block';
            currentProductId = productId;
        } catch (error) {
            console.error('Error al obtener los datos del producto:', error);
            alert('Error al obtener los datos del producto: ' + error.message);
        }
    }

    productUpdateForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const updatedProduct = {
            nombre: name.value,
            descripcion: description.value,
            precio: parseFloat(price.value),
            stock: parseInt(stock.value),
            categoria: category.value,
            marca: branch.value,
            codigoProducto: productCode.value,
            garantiaMeses: parseInt(garanty.value),
            coloresDisponibles: avaliableColors.value.split(',').map((color) => color.trim())
        };

        try {
            const response = await fetch(
                `/api/products/${currentProductId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                });

            if (!response.ok) {
                throw new Error('No se pudo actualizar el producto');
            }

            const data = await response.json();
            alert(data.message);

            productUpdateFormContainer.style.display = 'none';

            showAllProducts();
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar producto: ' + error.message);
        }
    });

    async function deleteProduct(productId) {
        try {
            const response = await fetch(
                `/api/products/${productId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }

            const data = await response.json();

            alert(data.message);

            const button = document.querySelector(`.deleteBtn[data-id='${productId}']`);
            if (button) {
                const row = button.closest('tr');
                row.remove();
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar producto: ' + error.message);
        }
    }

    createProductBtn.addEventListener('click', () => {
        createProductContainer.style.display = 'block';
    });

    createProductForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const validationError = createProductValidations(formData);

        if (validationError) {
            alert(validationError);  
            return;  
        }

        const productData = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            precio: parseFloat(formData.get('precio')),
            stock: parseInt(formData.get('stock')),
            categoria: formData.get('categoria'),
            marca: formData.get('marca'),
            codigoProducto: formData.get('codigoProducto'),
            fechaFabricacion: formData.get('fechaFabricacion'),
            garantiaMeses: parseInt(formData.get('garantiaMeses')),
            peso: parseFloat(formData.get('peso')),
            dimensiones: {
                alto: parseFloat(formData.get('dimensiones[alto]')),
                ancho: parseFloat(formData.get('dimensiones[ancho]')),
                profundidad: parseFloat(formData.get('dimensiones[profundidad]')),
            },
            coloresDisponibles: formData.get('coloresDisponibles')? formData.get('coloresDisponibles').split(',').map((c) => c.trim()) : [],
            etiquetas: formData.get('etiquetas') ? formData.get('etiquetas').split(',').map((e) => e.trim()) : [],
            imagenes: formData.get('imagenes') ? formData.get('imagenes').split(',').map((img) => img.trim()) : [],
            esActivo: formData.get('esActivo') === 'true',
        };

        createProductFetch(productData);
        createProductContainer.style.display = 'none';
    });

    async function createProductFetch(productData) {
        try {
            console.log('Enviando datos:', productData);
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
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
    }

    function createProductValidations(formData) {
        const precio = parseFloat(formData.get('precio'));
        const stock = parseInt(formData.get('stock'));
        const garantiaMeses = parseInt(formData.get('garantiaMeses'));
        const peso = parseFloat(formData.get('peso'));
        const alto = parseFloat(formData.get('dimensiones[alto]'));
        const ancho = parseFloat(formData.get('dimensiones[ancho]'));
        const profundidad = parseFloat(formData.get('dimensiones[profundidad]'));
    
        if (
            precio <= 0 ||
            stock < 0 ||
            garantiaMeses < 0 ||
            peso <= 0 ||
            alto <= 0 ||
            ancho <= 0 ||
            profundidad <= 0
        ) {
            return 'Por favor, asegurate de que todos los campos numéricos sean mayores que 0.';
        }
    
        return null;
    }
    


    function closeModal() {
        productsModal.style.display = 'none';
    }
});
