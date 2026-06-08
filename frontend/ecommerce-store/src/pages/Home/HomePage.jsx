import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './HomePage.css';
import ProductComponent from '../../components/Product/ProductComponent';
import Banner from './Banner';
import Info from './Info';
import Sections from './Sections';

function HomePage() {

    //home page states
    const [bestChoiceProduct, setBestChoiceProduct] = useState([]);
    const [laptopProducts, setLaptopProducts] = useState([]);
    const [computerProducts, setComputerProducts] = useState([]);

    // fetch all data for home page
    useEffect(() => {
        const fetchAllDaata = async () => {
            try {
                const [fetchBestChoiceProducts,fetchLaptopsProducts,fetchComputerProducts] = await Promise.all([
                    axios.get('http://localhost:5000/api/v1/products?page=1'),
                    axios.get('http://localhost:5000/api/v1/products?limit=5&category=laptops'),
                    axios.get('http://localhost:5000/api/v1/products?limit=5&category=computers')
                ])

                setBestChoiceProduct(fetchBestChoiceProducts.data.data)
                setLaptopProducts(fetchLaptopsProducts.data.data)
                setComputerProducts(fetchComputerProducts.data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchAllDaata();
    }, [])

    return (
        <>
            {/* <!---------------- Header ----------------> */}
            <HeaderComponent />
            {/* ---------------- container ---------------- */}
            <div class="container">
                {/* <!-- Banner --> */}
                <Banner />
                {/* <!-- Info --> */}
                <Info />
                {/* <!-- best choice Section --> */}
                <div class="best-choice">
                    <div class="best-choice-head">
                        <h1>Best Choice</h1>
                    </div>
                    <div class="best-choice-body">
                        <div class="body-template">
                            {
                                bestChoiceProduct.map((items) => {
                                    return (
                                        <ProductComponent items={items} ratings={items.ratings} key={items._id} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <!-- category Section --> */}
                <Sections laptopProducts={laptopProducts} computerProducts={computerProducts} />
            </div>
            {/* <!---------------- footer ----------------> */}
            <FooterCompoennt />
        </>
    )
}

export default HomePage