import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './CartPage.css';
import empty_cart from '../../assets/empty-cart.svg';
import { Cart } from '../../context/CartContext';
import { deleteCartItem } from '../../api/cartApi';
import { ACTIONS } from '../../context/CartReducer';
import CartHeader from './CartHeader';
import CartBody from './CartBody';

function CartPage() {

    // use context 
    const { state, dispatch } = Cart()

    //subtotal calculation
    let subTotal = 0;
    state.map((items) => {
        if (items.availability) {
            return subTotal = subTotal + (items.price * items.quantity)
        }
    })

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div className="cart-container">
                {/* cart header */}
                <CartHeader />

                {/* cart body */}
                <CartBody state={state} empty_cart={empty_cart} deleteCartItem={deleteCartItem} dispatch={dispatch} ACTIONS={ACTIONS} subTotal={subTotal} />
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CartPage;