import { useState } from "react";

function AccountSignup({ registerForm, name, setName, email, setEmail, password, setPassword, close_eye, open_eye, messages }) {

    // use states
    const [togglePass, setTogglePass] = useState(true);

    //See password toggle button
    function toggleSeePassword() {
        togglePass ? setTogglePass(prev => !prev) : setTogglePass(prev => !prev)
    }

    return (
        <>
            <div class="signup-container">
                <div class="signup-header">
                    <p>Sign Up</p>
                </div>
                <div class="signup-form">
                    <form onSubmit={registerForm}>
                        <div class="name">
                            <label>Your Name <span>*</span></label><br />
                            <input type="text" value={name} onChange={() => { setName(event.target.value) }} />
                        </div>
                        <div class="email">
                            <label>Email Address <span>*</span></label><br />
                            <input type="email" value={email} onChange={() => { setEmail(event.target.value) }} />
                        </div>
                        <div class="password">
                            <label>Password <span>*</span></label><br />
                            <input type={togglePass ? "password" : "text"} value={password} onChange={() => { setPassword(event.target.value) }} />
                            {
                                togglePass ?
                                    <img src={close_eye} class="open" alt="" onClick={() => toggleSeePassword()} />
                                    :
                                    <img src={open_eye} class="close" alt="" onClick={() => toggleSeePassword()} />
                            }
                        </div>
                        {
                            messages &&
                            <div class="messages">
                                <p class={messages.success === true ? "success" : "error"}>{messages.message}</p>
                            </div>
                        }
                        <input type="submit" class="button" value="Sign Up" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AccountSignup;