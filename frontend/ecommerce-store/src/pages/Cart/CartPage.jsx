import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './CartPage.css';

function CartPage() {
    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="cart-container">
                <div class="cart-header">
                    <div class="header-content">
                        <h1>Chopping Cart</h1>
                        <p><span>Home /</span> Shopping Cart</p>
                    </div>
                </div>
                <div class="cart-body">
                    <div class="cart-details">
                        <div class="details-head">
                            <p class="product">Product</p>
                            <p class="price">Price</p>
                            <p class="quantity">Quantity</p>
                            <p class="subtotal">Subtotal</p>
                            <p></p>
                        </div>
                        <div class="details-cards">
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <input type="checkbox" checked />
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                    </div>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <button class="plus">+</button>
                                    <p>1</p>
                                    <button class="min">−</button>
                                </div>
                                <div class="card-subtotal subtotal">
                                    <p>$234.34</p>
                                </div>
                                <button class="delete">✕</button>
                            </div>
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <input type="checkbox" checked />
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                    </div>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <button class="plus">+</button>
                                    <p>1</p>
                                    <button class="min">−</button>
                                </div>
                                <div class="card-subtotal subtotal">
                                    <p>$234.34</p>
                                </div>
                                <button class="delete">✕</button>
                            </div>
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <input type="checkbox" checked />
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                    </div>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <button class="plus">+</button>
                                    <p>1</p>
                                    <button class="min">−</button>
                                </div>
                                <div class="card-subtotal subtotal">
                                    <p>$234.34</p>
                                </div>
                                <button class="delete">✕</button>
                            </div>
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <input type="checkbox" checked />
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                    </div>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <button class="plus">+</button>
                                    <p>1</p>
                                    <button class="min">−</button>
                                </div>
                                <div class="card-subtotal subtotal">
                                    <p>$234.34</p>
                                </div>
                                <button class="delete">✕</button>
                            </div>
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <input type="checkbox" checked />
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                    </div>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <button class="plus">+</button>
                                    <p>1</p>
                                    <button class="min">−</button>
                                </div>
                                <div class="card-subtotal subtotal">
                                    <p>$234.34</p>
                                </div>
                                <button class="delete">✕</button>
                            </div>
                        </div>
                    </div>
                    <div class="cart-details-responsive">
                        <div class="card">
                            <div class="image">
                                <input type="checkbox" checked />
                                <img src="../../images/card-image.png" alt="" />
                            </div>
                            <div class="card-details">
                                <div class="name">
                                    <h1>Lenovo Legion 7i Gen 9 Laptop</h1>
                                    <button>✕</button>
                                </div>
                                <div class="price">
                                    <p>Price: </p>
                                    <h3>$234.44</h3>
                                </div>
                                <div class="quantity">
                                    <div class="quentity-header">
                                        <p>Quantity: </p>
                                    </div>
                                    <div class="quentity-body">
                                        <button class="plus">+</button>
                                        <p>1</p>
                                        <button class="min">−</button>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <p>Subtotal: </p>
                                    <h3>$234.44</h3>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="image">
                                <input type="checkbox" checked />
                                <img src="../../images/card-image.png" alt="" />
                            </div>
                            <div class="card-details">
                                <div class="name">
                                    <h1>Lenovo Legion 7i Gen 9 Laptop</h1>
                                    <button>✕</button>
                                </div>
                                <div class="price">
                                    <p>Price: </p>
                                    <h3>$234.44</h3>
                                </div>
                                <div class="quantity">
                                    <div class="quentity-header">
                                        <p>Quantity: </p>
                                    </div>
                                    <div class="quentity-body">
                                        <button class="plus">+</button>
                                        <p>1</p>
                                        <button class="min">−</button>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <p>Subtotal: </p>
                                    <h3>$234.44</h3>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="image">
                                <input type="checkbox" checked />
                                <img src="../../images/card-image.png" alt="" />
                            </div>
                            <div class="card-details">
                                <div class="name">
                                    <h1>Lenovo Legion 7i Gen 9 Laptop</h1>
                                    <button>✕</button>
                                </div>
                                <div class="price">
                                    <p>Price: </p>
                                    <h3>$234.44</h3>
                                </div>
                                <div class="quantity">
                                    <div class="quentity-header">
                                        <p>Quantity: </p>
                                    </div>
                                    <div class="quentity-body">
                                        <button class="plus">+</button>
                                        <p>1</p>
                                        <button class="min">−</button>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <p>Subtotal: </p>
                                    <h3>$234.44</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="total-card">
                        <div class="total-head">
                            <h1>Cart Totals</h1>
                        </div>
                        <div class="total-subtotal info">
                            <h3>Subtotal</h3>
                            <p>$289.34</p>
                        </div>
                        <div class="total-shipping info">
                            <h3>Shipping</h3>
                            <p>$20.00</p>
                        </div>
                        <div class="total-total info">
                            <h3>Total</h3>
                            <p><span>$302.34</span></p>
                        </div>
                        <button>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CartPage;