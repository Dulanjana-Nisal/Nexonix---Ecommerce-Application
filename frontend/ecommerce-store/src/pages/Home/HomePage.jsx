import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './HomePage.css';
import Banner from './Banner';
import Info from './Info';
import Category from './Category';
import BestChoice from './BestChoice';

function HomePage() {

    //home page states
    const [bestChoiceProduct, setBestChoiceProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch all data for home page
    useEffect(() => {
        const fetchAllDaata = async () => {
            setLoading(true)
            try {
                const [fetchBestChoiceProducts] = await Promise.all([
                    axios.get('http://localhost:5000/api/v1/products?page=1&limit=10'),
                ])

                setBestChoiceProduct(fetchBestChoiceProducts.data.data)
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }
        }
        fetchAllDaata();
    }, [])

    return (
        <>
            {/* <!---------------- Header ----------------> */}
            <HeaderComponent />
            {/* ---------------- container ---------------- */}
            <div className="container">
                {/* <!-- Banner --> */}
                <Banner />
                {/* <!-- Info-1 --> */}
                <Info />
                {/* <!--Category Section --> */}
                <Category />
                {/* <!-- best choice Section --> */}
                <BestChoice bestChoiceProduct={bestChoiceProduct} loading={loading} />
                {/* <!-- Info-2 --> */}
                <div className="second-info-container">
                    <div className="info-row">
                        <div className="second-info-box users">
                            <div className="box-left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="8" r="3.3" /><path d="M2.5 20c0-3.5 2.9-5.5 6.5-5.5s6.5 2 6.5 5.5" /><circle cx="17" cy="9" r="2.6" /><path d="M16 14.2c2.4.5 4 2 4 5.3" />
                                </svg>
                            </div>
                            <div className="box-right">
                                <h3>Trusted by 10,000+ Customers</h3>
                                <p>Quality products, excellent service</p>
                            </div>
                        </div>
                        <div className="second-info-box payments">
                            <div className="box-left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2.5" y="6" width="19" height="13" rx="2.5" /><path d="M2.5 10h19" /><circle cx="17" cy="14.5" r="1.3" />
                                </svg>
                            </div>
                            <div className="box-right">
                                <h3>30-Day Money Back</h3>
                                <p>Not satisfied? Get a full refund</p>
                            </div>
                        </div>
                        <div className="second-info-box products">
                            <div className="box-left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2l8 3.5v6c0 5-3.6 8.3-8 10.5-4.4-2.2-8-5.5-8-10.5v-6L12 2z" /><path d="M8.5 12l2.3 2.3L15.5 9.7" />
                                </svg>
                            </div>
                            <div className="box-right">
                                <h3>100% Authentic Products</h3>
                                <p>Genuine products, guaranteed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!---------------- footer ----------------> */}
            <FooterCompoennt />
        </>
    )
}

export default HomePage