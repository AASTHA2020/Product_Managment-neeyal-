import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import { addProduct, editProduct } from "./services/productService"; // API methods for adding/editing products

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [products, setProducts] = useState([]); // Array to store the list of products

    // Handle saving a product (either adding or editing)
    const handleSave = async (product) => {
        if (selectedProduct) {
            // Editing an existing product
            await editProduct(selectedProduct.id, product);
            setProducts(
                products.map((p) =>
                    p.id === selectedProduct.id ? { ...p, ...product } : p
                )
            );
        } else {
            // Adding a new product
            const newProduct = await addProduct(product);
            setProducts([newProduct, ...products]); // Add the new product at the top of the list
        }
        setIsFormVisible(false); // Close the form
    };

    // Handle cancelling the form
    const handleCancel = () => {
        setIsFormVisible(false);
        setSelectedProduct(null); // Reset selected product
    };

    // Handle editing a product
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsFormVisible(true); // Show the form to edit
    };

    // Handle adding a new product
    const handleAddProduct = () => {
        setSelectedProduct(null); // Clear selected product to indicate it's a new product
        setIsFormVisible(true); // Show the form for adding a new product
    };

    return (
        <div>
           

            <ProductTable onEditProduct={handleEditProduct} products={products} />

            {isFormVisible && (
                <ProductForm
                    product={selectedProduct}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default App;
