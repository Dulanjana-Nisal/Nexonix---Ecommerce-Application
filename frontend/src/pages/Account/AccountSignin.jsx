import { useState } from "react";

function AccountSignin({ loginFrom, loginEmail, setLoginEmail, loginPassword, setLoginPassword, loginmessages, close_eye, open_eye }) {

    // use states
    const [togglePass, setTogglePass] = useState(true);

    //See password toggle button
    function toggleSeePassword() {
        togglePass ? setTogglePass(prev => !prev) : setTogglePass(prev => !prev)
    }

    return (
        <>
            <div className="signin-container">
                <div className="signin-header">
                    <p>Sign In</p>
                </div>
                <div className="signin-form">
                    <form onSubmit={loginFrom}>
                        <div className="email">
                            <label>Email Address <span>*</span></label><br />
                            <input type="text" value={loginEmail} onChange={() => { setLoginEmail(event.target.value) }} />
                        </div>
                        <div className="password">
                            <label>Password <span>*</span></label><br />
                            <input type={togglePass ? "password" : "text"} value={loginPassword} onChange={() => { setLoginPassword(event.target.value) }} />
                            {
                                togglePass ?
                                    <img src={close_eye} className="open" alt="" onClick={() => toggleSeePassword()} />
                                    :
                                    <img src={open_eye} className="close" alt="" onClick={() => toggleSeePassword()} />
                            }
                        </div>
                        {
                            loginmessages &&
                            <div className="messages">
                                <p className={loginmessages.success === true ? "success" : "error"}>{loginmessages.message}</p>
                            </div>
                        }
                        <input type="submit" className="button" value="Sign In" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AccountSignin;