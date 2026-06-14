import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import open_eye from '../../assets/open-eye.png';
import close_eye from '../../assets/close-eye.png';
import './AccountPage.css';
import { useState } from 'react';
import api from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../../context/CartContext';
import { ACTIONS } from '../../context/CartReducer';
import ProfilePage from './ProfilePage';
import AccountSignin from './AccountSignin';
import AccountSignup from './AccountSignup';
import { Message } from '../../context/MessagesContext';

function AccountPage() {

    // cart context
    const {dispatch,user} = Cart();
    const {setupMessage} = Message();

    //use states
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [messages,setMessages] = useState({})
    const [loginmessages,setLoginMessages] = useState({})

    //login states
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const navigate = useNavigate();

    //fetch cart data
    const fetchCartData = async () =>{
        const result = await api.get('/cart')
        dispatch({
            type: ACTIONS.SET_CART,
            payload: result.data.data[0].items
        })
    }

    //user Login
    const loginFrom = async(e)=>{
        e.preventDefault();

        try{
            const login = await api.post('http://localhost:5000/api/v1/account/signin', {
                "email": loginEmail,
                "password": loginPassword,
            })

            // call fetch caart data function
            fetchCartData()

            //save token
            localStorage.setItem('token', login.data.token)
            setLoginMessages(login)

            localStorage.setItem(
                "user",
                JSON.stringify(login.data.user)
            )

            setTimeout(()=>{
                if(login.data.user.role === "admin"){
                    navigate('/admin/dashboard')
                }
                if(login.data.user.role === "user"){
                    navigate('/')
                    location.reload()
                }
            }, 1600)
        }
        catch(err){
            setLoginMessages(err.response.data)
            setTimeout(()=>{
                setLoginMessages(false)
            }, 1500)
        }

    }

    //user Register
    const registerForm = async (e)=>{

        e.preventDefault()

        try{
            await api.post('http://localhost:5000/api/v1/account/signup', {
                "name": name,
                "email": email,
                "password": password,
            })

            // call fetch cart data function
            fetchCartData()

            setMessages({
                success: true,
                message: "Register Success!"
            })

            setupMessage("success", "Register Success now you can login")

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(()=>{
                setMessages(false)

            }, 1000)
        }
        catch(err){
            setMessages(err.response.data)
            setTimeout(()=>{
                setMessages(false)
            }, 1500)
        }
    }
    
    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="account-container">
                {
                    !user &&
                    <div class="container-header">
                        <h1>My Account</h1>
                        <p><span>Home /</span> My Account</p>
                    </div>
                }
                {
                    user &&
                        <ProfilePage navigate={navigate} dispatch={dispatch} user={user} />
                }
                {
                    !user &&
                    <div class="container-body">
                        <AccountSignin loginFrom={loginFrom} loginEmail={loginEmail} setLoginEmail={setLoginEmail} loginPassword={loginPassword} setLoginPassword={setLoginPassword} loginmessages={loginmessages} close_eye={close_eye} open_eye={open_eye} />

                        <AccountSignup registerForm={registerForm} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} close_eye={close_eye} open_eye={open_eye} messages={messages} />
                    </div>
                }
            </div>
            <FooterCompoennt />
        </>
    )
}

export default AccountPage;