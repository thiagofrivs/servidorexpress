const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        const codeExists = products.some(p => p.code === product.code);
        if (codeExists) {
            console.log('Error: El código ya existe');
            return;
        }
        const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        product.id = id;
        products.push(product);
        this.saveProducts(products);
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error: No se pudo leer el archivo');
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            console.log('Error: No se encontró el producto');
            return null;
        }
    }

    updateProduct(id, fieldsToUpdate) {
        let products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...fieldsToUpdate };
            this.saveProducts(products);
        } else {
            console.log('Error: No se encontró el producto');
        }
    }

    deleteProduct(id) {
        let products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            this.saveProducts(products);
        } else {
            console.log('Error: No se encontró el producto');
        }
    }

    saveProducts(products) {
        try {
            const data = JSON.stringify(products, null, 2);
            fs.writeFileSync(this.path, data);
            console.log('Productos guardados correctamente');
        } catch (error) {
            console.log('Error: No se pudo guardar el archivo');
        }
    }
}

module.exports = ProductManager;