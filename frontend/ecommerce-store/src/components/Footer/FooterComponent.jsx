import './FooterComponent.css'

function FooterCompoennt() {
    return (
        <>
            <div class="footer">
                <div class="footer-top">
                    <div class="location">
                        <div class="title">
                            <p>About the store</p>
                        </div>
                        <div class="details">
                            <p>
                                Got Questions? Call us 24/7 <br />
                                <span>+XX-XXX-XXX</span> <br />
                                No 12 road, Colombo Sri Lnaka
                            </p>
                            <a href="#">custommersupport@gmail.com</a><br />
                            <a href="#">testmail@gmail.com</a>
                        </div>
                    </div>
                    <div class="information">
                        <div class="title">
                            <p>Informations</p>
                        </div>
                        <div class="details">
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Delivery Informations</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">About Developer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="links">
                        <div class="title">
                            <p>Quick Links</p>
                        </div>
                        <div class="details">
                            <ul>
                                <li><a href="#">Order Traking</a></li>
                                <li><a href="#">Your Cart</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="pages">
                        <div class="title">
                            <p>Informations</p>
                        </div>
                        <div class="details">
                            <ul>
                                <li><a href="#">All Products</a></li>
                                <li><a href="#">Laptops</a></li>
                                <li><a href="#">computers</a></li>
                                <li><a href="#">Softwares</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="copyright">
                        <p>&copy;<span>Nexonix</span> all rights reserved. Develop by <span>Dulanjana Nisal</span></p>
                    </div>
                    <div class="payment">
                        <p>Pyment Methods: </p>
                        <img src="https://uminex.kutethemes.net/wp-content/uploads/2022/12/01-payment.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterCompoennt;