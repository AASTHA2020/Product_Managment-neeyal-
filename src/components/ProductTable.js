import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { fetchProducts, addProduct } from "../services/productService";  // Make sure to import your productService
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import "../styles/components.css";

const ProductTable = ({ onEditProduct }) => {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [dateRange, setDateRange] = useState(null);

    // Load products on initial render
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (newProduct) => {
        // Add the product to the list
        const addedProduct = await addProduct(newProduct);
        setProducts([addedProduct, ...products]);  // Add the new product at the top
    };

    const paginatorLeft = <Button icon="pi pi-refresh" onClick={loadProducts} />;
    const paginatorRight = <span>Page Navigation →</span>;

    const categoryFilterTemplate = (options) => (
        <Dropdown
            value={options.value}
            options={options.filterOptions}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Select a Category"
            className="p-column-filter"
        />
    );

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.image} alt={rowData.title} width="50" />;
    };

    const priceFilterTemplate = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.filterCallback(e.value)}
                mode="currency"
                currency="USD"
                min={0}
                showButtons
            />
        );
    };

    const dateFilterTemplate = (options) => {
        return (
            <Calendar
                value={options.value}
                onChange={(e) => options.filterCallback(e.value)}
                dateFormat="yy-mm-dd"
                showIcon
            />
        );
    };

    return (
        <div className="datatable-container">
            <div className="datatable-header">
                <h2>Product Management</h2>
                <Button
                    label="Add Product"
                    icon="pi pi-plus"
                    onClick={() => onEditProduct(null)} // Open the form in "add" mode
                    className="p-button-success"
                />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        placeholder="Search products..."
                        onInput={(e) => setGlobalFilter(e.target.value)}
                    />
                </span>
            </div>

            <DataTable
    value={products}
    paginator
    rows={10}
    rowsPerPageOptions={[10, 25, 50]}
    paginatorLeft={paginatorLeft}
    paginatorRight={paginatorRight}
    globalFilter={globalFilter}
    filters={filters}
    filterDisplay="row"
    loading={loading}
    sortField={sortField}
    sortOrder={sortOrder}
    responsiveLayout="scroll"
    className="p-datatable-gridlines"
    emptyMessage="No products found."
>
    <Column
        header="Image"
        body={imageBodyTemplate}
        style={{ width: "80px" }}
    />
    <Column
        field="title"
        header="Name"
        sortable
        filter
        filterPlaceholder="Search by Name"
    />
    <Column
        field="price"
        header="Price"
        body={(rowData) => `$${rowData.price.toFixed(2)}`}
        filter
        filterElement={priceFilterTemplate}
    />
    <Column
        field="category"
        header="Category"
        filter
        filterElement={(options) =>
            categoryFilterTemplate({
                ...options,
                filterOptions: products.map((p) => p.category),
            })
        }
    />
    <Column
        field="createdAt"
        header="Created At"
        filter
        filterElement={dateFilterTemplate}
    />
    <Column
        header="Actions"
        body={(rowData) => (
            <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={() => onEditProduct(rowData)} // Open product in "edit" mode
            />
        )}
    />
</DataTable>

        </div>
    );
};

export default ProductTable;
