function ProductListContainer({ products, updateProductsToggleButton, deleteProduct }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="name row">
                        <p>Product</p>
                    </th>
                    <th className="category row">
                        <p>Category</p>
                    </th>
                    <th className="qnt row">
                        <p>Qunatity</p>
                    </th>
                    <th className="price row">
                        <p>Price</p>
                    </th>
                    <th className="availability row">
                        <p>Availability</p>
                    </th>
                    <th className="action row">
                        <p>Actions</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((items) => {
                        return (
                            <tr className="product-box products" key={items._id}>
                                <td className="name row">
                                    <div className="image"><img src={items.image} alt="" /></div>
                                    <div className="details">
                                        <h4>{items.name}</h4>
                                        <p>ID: {items._id}</p>
                                    </div>
                                </td>
                                <td className="cat row">
                                    <p>{items.category}</p>
                                </td>
                                <td className="qnt row">
                                    <p>{items.stock} Products</p>
                                </td>
                                <td className="price row">
                                    <p>${items.price}</p>
                                </td>
                                <td className="availability row">
                                    <p className={items.availability ? "availabale" : "unavailabale"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                </td>
                                <td className="buttons row">
                                    <div className="buttons-content">
                                        <button className="update" onClick={() => updateProductsToggleButton(items._id)}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <svg onClick={() => deleteProduct(items._id)} className="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ProductListContainer;