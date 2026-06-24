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

    // fetch all data for home page
    useEffect(() => {
        const fetchAllDaata = async () => {
            try {
                const [fetchBestChoiceProducts] = await Promise.all([
                    axios.get('http://localhost:5000/api/v1/products?page=1'),
                ])

                setBestChoiceProduct(fetchBestChoiceProducts.data.data)
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
                {/* <!--Category Section --> */}
                <Category />
                {/* <!-- best choice Section --> */}
                <BestChoice bestChoiceProduct={bestChoiceProduct} />
            </div>
            {/* <!---------------- footer ----------------> */}
            <FooterCompoennt />
        </>
    )
}

export default HomePage