const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('productos.json');

// Ruta '/products' - Devuelve todos los productos o un número limitado de productos
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();
  
  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

// Ruta '/products/:pid' - Devuelve un producto específico por su ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
}); 