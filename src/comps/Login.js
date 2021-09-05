import React from "react"
import Background from '../background.png'

const Login = ( { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, emailError, passwordError, setHasAccount} ) => {
    return (
        <section className="login" style={{backgroundImage: `url(${Background})`, backgroundRepeat: "repeat", filter: "blur(0)"}}>
            <div className="loginContainer" style={{filter: "blur(0)"}}>
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}  />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    { hasAccount ? (
                        <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>Sign Up</button>
                        <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}

                </div>
            </div>
        </section>
    )
}

export default Login
