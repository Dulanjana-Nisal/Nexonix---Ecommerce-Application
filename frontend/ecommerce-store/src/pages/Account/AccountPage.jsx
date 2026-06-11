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

function AccountPage() {

    // cart context
    const {dispatch,user} = Cart();

    //use states
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [togglePass,setTogglePass] = useState(true);
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
            const login = await api.post('http://localhost:5000/api/v1/user/signin', {
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
                }
            }, 1000)
        }
        catch(err){
            setLoginMessages(err.response.data)
            setTimeout(()=>{
                setLoginMessages(false)
            }, 1000)
        }

    }

    //user Register
    const registerForm = async (e)=>{

        e.preventDefault()

        try{
            await api.post('http://localhost:5000/api/v1/user/signup', {
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
            }, 1000)
        }
    }

    //See password toggle button
    function toggleSeePassword(){
        togglePass ? setTogglePass(prev => !prev) : setTogglePass(prev => !prev)
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
                        <div class="signin-container">
                            <div class="signin-header">
                                <p>Sign In</p>
                            </div>
                            <div class="signin-form">
                                <form onSubmit={loginFrom}>
                                    <div class="email">
                                        <label>Email Address <span>*</span></label><br />
                                        <input type="text" value={loginEmail} onChange={() => {setLoginEmail(event.target.value)}}/>
                                    </div>
                                    <div class="password">
                                        <label>Password <span>*</span></label><br />
                                        <input type={togglePass ? "password" : "text"} value={loginPassword} onChange={() => {setLoginPassword(event.target.value)}}/>
                                        {
                                            togglePass ?
                                            <img src={close_eye} class="open" alt="" onClick={() => toggleSeePassword()}/>
                                            :
                                            <img src={open_eye} class="close" alt="" onClick={() => toggleSeePassword()}/>
                                        }
                                    </div>
                                    {
                                        loginmessages &&
                                        <div class="messages">
                                            <p class={loginmessages.success === true ? "success" : "error"}>{loginmessages.message}</p>
                                        </div>
                                    }
                                    <input type="submit" class="button" value="Sign In" />
                                </form>
                            </div>
                        </div>
                        <div class="signup-container">
                            <div class="signup-header">
                                <p>Sign Up</p>
                            </div>
                            <div class="signup-form">
                                <form onSubmit={registerForm}>
                                    <div class="name">
                                        <label>Your Name <span>*</span></label><br />
                                        <input type="text" value={name} onChange={() => {setName(event.target.value)}}/>
                                    </div>
                                    <div class="email">
                                        <label>Email Address <span>*</span></label><br />
                                        <input type="email" value={email} onChange={() => {setEmail(event.target.value)}}/>
                                    </div>
                                    <div class="password">
                                        <label>Password <span>*</span></label><br />
                                        <input type={togglePass ? "password" : "text"} value={password} onChange={() => {setPassword(event.target.value)}}/>
                                        {
                                            togglePass ?
                                            <img src={close_eye} class="open" alt="" onClick={() => toggleSeePassword()}/>
                                            :
                                            <img src={open_eye} class="close" alt="" onClick={() => toggleSeePassword()}/>
                                        }
                                    </div>
                                    {
                                        messages  &&
                                        <div class="messages">
                                            <p class={messages.success === true ? "success" : "error"}>{messages.message}</p>
                                        </div>
                                    }
                                    <input type="submit" class="button" value="Sign Up" />
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <FooterCompoennt />
        </>
    )
}

export default AccountPage;