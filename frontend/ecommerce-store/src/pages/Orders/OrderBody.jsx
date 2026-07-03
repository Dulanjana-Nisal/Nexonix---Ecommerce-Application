function OrderBody({ orders, cancleOrder }) {
    return (
        <div className="order-body">
            <div className="order-details">
                <table>
                    <thead>
                        <tr className="details-head">
                            <th>Product</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Method</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((items) => {
                                return (
                                    <tr className="card" key={items._id}>
                                        <td className="card-product">
                                            <div className="thumb">
                                                <img src={items.image} alt="" />
                                            </div>
                                            <div className="name">
                                                <p>{items.productName}</p>
                                                <p className="order-id">OID: {items._id}</p>
                                            </div>
                                        </td>
                                        <td className="card-date">
                                            <p>{(items.createdAt).slice(0, 10)}</p>
                                        </td>
                                        <td className="card-price">
                                            <p>${items.price}</p>
                                        </td>
                                        <td className="card-quantity">
                                            <p>{items.quantity}</p>
                                        </td>
                                        <td className="card-method">
                                            <p>{items.method === 'cash-on-delivery' ? 'Cash on Delivery' : "Card Payment"}</p>
                                        </td>
                                        <td className="card-total">
                                            <p>${items.price * items.quantity + (items.tax || 0)}</p>
                                        </td>
                                        <td className="card-state">
                                            {
                                                items.status === "Cancelled" || items.status === "Processing" ?
                                                    <div className="status-menu">
                                                        <h4 className={(items.status).toLowerCase()}>{items.status}</h4>
                                                        <svg className="delete" onClick={() => cancleOrder(items._id, items.name, items.userId, items.status)} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                    </div>
                                                    :
                                                    <div className="status-menu">
                                                        <h4 className={(items.status).toLowerCase()}>{items.status}</h4>
                                                    </div>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="order-details-responsive">
                {
                    orders.map((items) => {
                        return (
                            <div className="card" key={items._id} key={items._id}>
                                <div className="image">
                                    <img src={items.image} alt="" />
                                </div>
                                <div className="card-details">
                                    <div className="details-header">
                                        <h1>{items.productName}</h1>
                                        <p>OID: {items._id}</p>
                                    </div>
                                    <div className="details-footer">
                                        <div className="card-date">
                                            <h3>Date</h3>
                                            <p>{(items.createdAt).slice(0, 10)}</p>
                                        </div>
                                        <div className="card-price">
                                            <h3>Price: </h3>
                                            <p>${items.price}</p>
                                        </div>
                                        <div className="card-quantity">
                                            <h3>Quantity: </h3>
                                            <p>{items.quantity}</p>
                                        </div>
                                        <div className="card-method">
                                            <h3>Method: </h3>
                                            <p>{items.method === 'cash-on-delivery' ? 'Cash on Delivery' : "Card Payment"}</p>
                                        </div>
                                        <div className="card-total">
                                            <h3>Total: </h3>
                                            <p>${items.price * items.quantity + (items.tax || 0)}</p>
                                        </div>
                                        <div className="card-state">
                                            <h3>Status: </h3>
                                            <h4 className={(items.status).toLowerCase()}>{items.status}</h4>
                                        </div>
                                    </div>
                                    {
                                        items.status === "Cancelled" || items.status === "Processing" &&
                                        <svg className="delete" onClick={() => cancleOrder(items._id, items.name, items.userId, items.status)} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OrderBody;