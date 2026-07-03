import './HeaderComponent.css';
import hamberger_menu from '../../assets/hamberger-menu.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { displaySearchBox, hideSearchBox } from '../../utils/Buttons';
import { Cart } from '../../context/CartContext';
import { Notifications } from '../../context/NotificationContext';
import HeaderComponentTopContainer from './HeaderComponentTopContainer';
import HeaderComponentMiddleContainer from './HeaderComponentMiddleContainer';
import HeaderComponentNavbarContainer from './HeaderComponentNavbarContainer';

function HeaderComponent() {

    // use states for header
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [toggleHamberger, setToggleHamberger] = useState(false);

    // use context
    const { state } = Cart();
    const { notifiState } = Notifications()

    // get param values
    const { category } = useParams();

    //load localstorage
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const email = user?.email

    //get infor from search result box
    const searchResultBox = useRef();

    //get cart item summery
    let cartHeaderSummery = state.reduce((acc, items) => {
        acc.count += items.quantity;
        acc.fullPrice += items.price * items.quantity;
        return acc;
    },
        { count: 0, fullPrice: 0 })

    // add search values to use state if have more than 1 letter
    const searchInputValues = (event) => {
        const valueData = event.target.value
        valueData.length > 1 && setSearchValue(valueData)
        valueData.length < 1 && setSearchValue("")
        setToggleHamberger(false)
    }

    //get Search Data
    useEffect(() => {
        const fetchSearchData = async () => {
            setLoading(true)
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/products?search=${searchValue}&limit=5`);
                setSearchResult(result.data.data)
            }
            catch (err) {
                console.log(err.response)
                setSearchResult([])
            }
            finally {
                setLoading(false)
            }
        }
        fetchSearchData();
    }, [searchValue])

    return (
        <>
            <div className="header-top">
                {/* Header top container */}
                <HeaderComponentTopContainer />
            </div>
            <div className="header">
                {/* Header middle component */}
                <HeaderComponentMiddleContainer hideSearchBox={hideSearchBox} searchResultBox={searchResultBox} displaySearchBox={displaySearchBox} searchInputValues={searchInputValues} searchValue={searchValue} loading={loading} searchResult={searchResult} setSearchValue={setSearchValue} email={email} notifiState={notifiState} cartHeaderSummery={cartHeaderSummery} />

                <hr />

                {/* Header navbar container */}
                <HeaderComponentNavbarContainer hideSearchBox={hideSearchBox} searchResultBox={searchResultBox} setToggleHamberger={setToggleHamberger} hamberger_menu={hamberger_menu} toggleHamberger={toggleHamberger} category={category} />
                <hr />
            </div>
        </>
    )
}

export default HeaderComponent;