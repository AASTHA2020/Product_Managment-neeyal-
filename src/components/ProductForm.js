import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProductForm = ({ onSave, product = {}, onCancel }) => {
    const [formData, setFormData] = useState({
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",  // For handling image upload
    });

    const categories = ["Electronics", "Clothing", "Accessories", "Books"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simulate uploading the image to a server or get URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    image: reader.result,  // Store the image URL (or upload to server)
                }));
            };
            reader.readAsDataURL(file);  // or upload it and get URL
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);  // Call parent to save the form data
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <label>Price:</label>
            <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <label>Category:</label>
            <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <label>Image:</label>
            <input
                type="file"
                onChange={handleImageChange}
            />
            <button type="submit">Save Product</button>
        </form>
    );
};

export default ProductForm;