import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './DetailsPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addCartItems } from '../../api/cartApi';
import { Cart } from '../../context/CartContext';
import { Message } from '../../context/MessagesContext';
import api from '../../services/auth';
import DetailsNotFoundContainer from './DetailsNotFoundContainer';
import DetailsHeader from './DetailsHeader';
import DetailsProductContainer from './DetailsProductContainer';
import DetailsOptionContainer from './DetailsOptionContainer';
import DetailsSuggetionsContainer from './DetailsSuggetionsContainer';

function DetailsPage() {

    // load context
    const { state, dispatch, user } = Cart();
    const { setupMessage } = Message();

    //get product id form url
    const { productId } = useParams();

    //use states
    const [producatDetails, setProductDetails] = useState([])
    const [productRecomendation, setProductRecomendation] = useState([])
    const [producatKeywords, setProducatKeywords] = useState([])
    const [reviews, setReviews] = useState([])
    const [reviewsResult, setReviewsResult] = useState(0)
    const [allReviewsData, setAllReviewsData] = useState([])
    const [fullScreen, setFullScreen] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [option, setOption] = useState(false)
    const [addReviews, setAddReviews] = useState({ productId: productId })
    const [refesh, setRefesh] = useState(false)
    const [page, setPage] = useState(1)
    const [scrollWidth, setScrollWidth] = useState(0)

    // add quntity
    function addQnt() {
        const sum = quantity + 1
        quantity == producatDetails.stock ? setQuantity(producatDetails.stock) : setQuantity(sum)
    }

    //min quantity
    function minQnt() {
        const sum = quantity - 1
        quantity === 1 ? setQuantity(1) : setQuantity(sum)
    }

    // fetch all data
    useEffect(() => {
        const fetchAllData = async () => {
            const [products, recommendations, allReviewsData] = await Promise.all([
                axios.get(`http://localhost:5000/api/v1/products/${productId}`),
                axios.get(`http://localhost:5000/api/v1/products/${productId}/recommendations`),
                axios.get(`http://localhost:5000/api/v1/reviews?productId=${productId}&limit=all`),
            ])
            setProductDetails(products.data.data)
            setProducatKeywords(products.data.data.keywords)
            setProductRecomendation(recommendations.data.data)
            setAllReviewsData(allReviewsData.data.data)
            setScrollWidth(0)
        }
        fetchAllData()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [productId, refesh])

    //fetch reviews data
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/reviews?productId=${productId}&page=${page}`)
                setReviews(result.data.data)
                setReviewsResult(result.data)
            }
            catch (err) {
                console.log(err.response)
            }
        }
        fetchReviews();
    }, [productId, refesh, page])

    //submit reviews
    const submitReviews = async (e) => {
        e.preventDefault();

        //calculate new rating count
        const avg = Number(producatDetails.ratings) || 0;
        const count = Number(reviewsResult.all_result) || 0;
        const newRating = Number(addReviews.ratings);
        const newRatingCount = (avg * count + newRating) / (count + 1);

        try {
            await api.post('/reviews', addReviews)
            await api.patch(`/products/${productId}`, { ratings: Math.round(newRatingCount) })
            setPage(1)
            setAddReviews({ productId: productId, message: '', ratings: 0 })
            setupMessage('success', 'Your Review is added successfully...', 'Review Added')
        }
        catch (err) {
            console.log(err.response)
            setupMessage('error', 'Error while submiting your Review tray again later!', 'Review Submit Faild!')
        }
        setRefesh(prev => !prev)
    }

    // display ratings
    const ratingsQuery = {
        5: <p className="four-star">&#9733; &#9733; &#9733; &#9733; &#9733; </p>,
        4: <p className="four-star">&#9733; &#9733; &#9733; &#9733; &#9734; </p>,
        3: <p className="four-star">&#9733; &#9733; &#9733; &#9734; &#9734; </p>,
        2: <p className="four-star">&#9733; &#9733; &#9734; &#9734; &#9734; </p>,
        1: <p className="four-star">&#9733; &#9734; &#9734; &#9734; &#9734; </p>,
    }

    //calculate result limit page
    const limitResult = Math.ceil(reviewsResult.all_result / reviewsResult.limit)

    //count reviews
    function reviewsCounter(countNumber) {
        let number = 0
        allReviewsData.map(items => items.ratings === Number(countNumber) && number++)
        return number
    }

    // suggetions scroll buttons

    const scrollToLeft = () => {
        setScrollWidth(prev => prev + 250)
    }

    const scrollToRight = () => {
        setScrollWidth(prev => prev - 250)
    }

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            {
                producatDetails.length === 0 ?
                    // Details Not Found container
                    <DetailsNotFoundContainer />
                    :
                    <div className="details-container">
                        {/* Details Header */}
                        <DetailsHeader producatDetails={producatDetails} />

                        {/* Details Product Container */}
                        <DetailsProductContainer producatDetails={producatDetails} setFullScreen={setFullScreen} fullScreen={fullScreen} ratingsQuery={ratingsQuery} reviewsResult={reviewsResult} quantity={quantity} state={state} minQnt={minQnt} addQnt={addQnt} addCartItems={addCartItems} dispatch={dispatch} setupMessage={setupMessage} />

                        {/* Details Option container */}
                        <DetailsOptionContainer option={option} setOption={setOption} producatDetails={producatDetails} ratingsQuery={ratingsQuery} producatKeywords={producatKeywords} reviewsCounter={reviewsCounter} reviewsResult={reviewsResult} reviews={reviews} user={user} page={page} setPage={setPage} limitResult={limitResult} submitReviews={submitReviews} addReviews={addReviews} setAddReviews={setAddReviews} />

                        {/* Details Suggetions Container */}
                        <DetailsSuggetionsContainer productRecomendation={productRecomendation} scrollWidth={scrollWidth} scrollToLeft={scrollToLeft} scrollToRight={scrollToRight} />
                    </div>
            }
            <FooterCompoennt />
        </>
    )
}

export default DetailsPage;