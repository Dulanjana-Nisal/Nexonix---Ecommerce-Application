import { useState } from "react";

function AccountSignin({loginFrom,loginEmail,setLoginEmail,loginPassword,setLoginPassword,loginmessages,close_eye,open_eye}) {

    // use states
    const [togglePass,setTogglePass] = useState(true);

    //See password toggle button
    function toggleSeePassword(){
        togglePass ? setTogglePass(prev => !prev) : setTogglePass(prev => !prev)
    }

    console.log(loginmessages.message)

    return (
        <>
            <div class="signin-container">
                <div class="signin-header">
                    <p>Sign In</p>
                </div>
                <div class="signin-form">
                    <form onSubmit={loginFrom}>
                        <div class="email">
                            <label>Email Address <span>*</span></label><br />
                            <input type="text" value={loginEmail} onChange={() => { setLoginEmail(event.target.value) }} />
                        </div>
                        <div class="password">
                            <label>Password <span>*</span></label><br />
                            <input type={togglePass ? "password" : "text"} value={loginPassword} onChange={() => { setLoginPassword(event.target.value) }} />
                            {
                                togglePass ?
                                    <img src={close_eye} class="open" alt="" onClick={() => toggleSeePassword()} />
                                    :
                                    <img src={open_eye} class="close" alt="" onClick={() => toggleSeePassword()} />
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
        </>
    )
}

export default AccountSignin;