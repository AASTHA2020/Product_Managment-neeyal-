// AddProduct.js

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const AddProduct = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        category: "",
        image: "",
    });

    const categories = ["Electronics", "Clothing", "Accessories", "Books"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // For simplicity, using a file URL as the image source.
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.price || !formData.category || !formData.image) {
            alert("All fields are required!");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="form-container">
            <h3>Add Product</h3>
            <div className="form-field">
                <label>Name:</label>
                <InputText
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-field">
                <label>Price:</label>
                <InputNumber
                    name="price"
                    value={formData.price}
                    onValueChange={(e) => setFormData({ ...formData, price: e.value })}
                    mode="currency"
                    currency="USD"
                />
            </div>
            <div className="form-field">
                <label>Category:</label>
                <Dropdown
                    name="category"
                    value={formData.category}
                    options={categories.map((cat) => ({ label: cat, value: cat }))}
                    onChange={(e) => setFormData({ ...formData, category: e.value })}
                    placeholder="Select a Category"
                />
            </div>
            <div className="form-field">
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="p-inputtext p-component"
                />
            </div>
            {formData.image && (
                <div className="form-field">
                    <img src={formData.image} alt="Product Preview" width="100" />
                </div>
            )}
            <div className="form-buttons">
                <Button label="Save" icon="pi pi-check" onClick={handleSubmit} />
                <Button label="Cancel" icon="pi pi-times" onClick={onCancel} />
            </div>
        </div>
    );
};

export default AddProduct;
