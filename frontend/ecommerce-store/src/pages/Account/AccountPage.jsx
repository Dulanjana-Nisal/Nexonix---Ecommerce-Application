import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import open_eye from '../../assets/open-eye.png';
import close_eye from '../../assets/close-eye.png';
import './AccountPage.css';
import axios from 'axios';
import { useState } from 'react';

function AccountPage() {

    //use states
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [togglePass,setTogglePass] = useState(true);
    const [messages,setMessages] = useState({})

    //user Register
    const registerForm = async (e)=>{

        e.preventDefault()

        try{
            await axios.post('http://localhost:5000/api/v1/user/signup', {
                "name": name,
                "email": email,
                "password": password,
            })
            setMessages({
                success: true,
                message: "Register Success!"
            })
            
            setName("");
            setEmail("");
            setPassword("");

            setTimeout(()=>{
                setMessages(false)
            }, 3000)
        }
        catch(err){
            setMessages(err.response.data)
            setTimeout(()=>{
                setMessages(false)
            }, 3000)
        }
    }
    console.log(messages)

    //See password toggle button
    function toggleSeePassword(){
        togglePass ? setTogglePass(false) : setTogglePass(true)
    }
    
    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="account-container">
                <div class="container-header">
                    <h1>My Account</h1>
                    <p><span>Home /</span> My Account</p>
                </div>
                <div class="container-body">
                    <div class="signin-container">
                        <div class="signin-header">
                            <p>Sign In</p>
                        </div>
                        <div class="signin-form">
                            <form>
                                <div class="email">
                                    <label>Email Address <span>*</span></label><br />
                                    <input type="text" />
                                </div>
                                <div class="password">
                                    <label>Password <span>*</span></label><br />
                                    <input type="password" />
                                     {
                                        togglePass ?
                                        <img src={close_eye} class="open" alt="" onClick={() => toggleSeePassword()}/>
                                        :
                                        <img src={open_eye} class="close" alt="" onClick={() => toggleSeePassword()}/>
                                    }
                                </div>
                                {
                                    messages.length > 1 &&
                                    <div class="messages">
                                        <p class={messages.success === true ? "success" : "error"}>{messages.message}</p>
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
            </div>
            <FooterCompoennt />
        </>
    )
}

export default AccountPage;