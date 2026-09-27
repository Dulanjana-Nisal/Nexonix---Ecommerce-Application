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
            <div className="signup-container">
                <div className="signup-header">
                    <p>Sign Up</p>
                </div>
                <div className="signup-form">
                    <form onSubmit={registerForm}>
                        <div className="name">
                            <label>Your Name <span>*</span></label><br />
                            <input type="text" value={name} onChange={() => { setName(event.target.value) }} />
                        </div>
                        <div className="email">
                            <label>Email Address <span>*</span></label><br />
                            <input type="email" value={email} onChange={() => { setEmail(event.target.value) }} />
                        </div>
                        <div className="password">
                            <label>Password <span>*</span></label><br />
                            <input type={togglePass ? "password" : "text"} value={password} onChange={() => { setPassword(event.target.value) }} />
                            {
                                togglePass ?
                                    <img src={close_eye} className="open" alt="" onClick={() => toggleSeePassword()} />
                                    :
                                    <img src={open_eye} className="close" alt="" onClick={() => toggleSeePassword()} />
                            }
                        </div>
                        {
                            messages &&
                            <div className="messages">
                                <p className={messages.success === true ? "success" : "error"}>{messages.message}</p>
                            </div>
                        }
                        <input type="submit" className="button" value="Sign Up" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AccountSignup;