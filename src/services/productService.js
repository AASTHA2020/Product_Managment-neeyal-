import axios from 'axios';  // Make sure axios is imported

const API_URL = 'https://fakestoreapi.com/products';  // Make sure API_URL is defined

export const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    console.log("Fetched products:", response.data);
    return response.data.map((product) => ({
        ...product,
        imageUrl: `https://fakestoreapi.com/img/${product.image}`,  // Ensure this path matches the actual image path in the API response
    }));
};

export const addProduct = async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

export const editProduct = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};
