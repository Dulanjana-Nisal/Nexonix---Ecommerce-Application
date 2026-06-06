import delivery_thumb from '../../assets/delevery-thumb.png';
import payment_thumb from '../../assets/payment-thumb.png';
import products_thumb from '../../assets/products-thumb.png';

function Info() {
    return (
        <>
            <div class="info">
                <div class="info-box">
                    <div class="box-img">
                        <img src={delivery_thumb} alt="info-thumb" />
                    </div>
                    <div class="box-data">
                        <h4>Fast Delivery</h4>
                        <p>Deliver in 24 Hours max!</p>
                    </div>
                </div>
                <div class="info-box">
                    <div class="box-img">
                        <img src={payment_thumb} alt="info-thumb" />
                    </div>
                    <div class="box-data">
                        <h4>Safe Payment</h4>
                        <p>100% Secure Payment</p>
                    </div>
                </div>
                <div class="info-box">
                    <div class="box-img">
                        <img src={products_thumb} alt="info-thumb" />
                    </div>
                    <div class="box-data">
                        <h4>Best Products</h4>
                        <p>Selling Top Rated Products</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info;