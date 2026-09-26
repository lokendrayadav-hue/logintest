import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/Context";

const Login = ()=>{
    const[identifier, setIdentifier] = useState();
    const [otpInput, setOtpInput] = useState('');
    const[error, setError] = useState();
    const {step, profileData, AuthLoggedIn, SendOtp, validateOtp, logout} = useGlobalContext();
    useEffect(()=>{
        
    },[error])

    const SendLogin = () =>{
        if (!identifier || identifier?.length < 10 || identifier?.length > 10) {
            setError('Please enter a valid phone number');
            return;
        }else{
            setError("");
            SendOtp(identifier);
        }        
    }
    const OtpSubmit = () =>{
        if (!otpInput || otpInput?.length < 6 || otpInput?.length > 6) {
            setError('Please Fill 6 Digit Code');
            return;
        }else{
            setError("");
            validateOtp(otpInput);  
        }     
    }
    const userLogout = () =>{
        logout();
        setIdentifier("");
        setOtpInput("")

    }
    
    console.log(profileData)
    
    return(
        <>
           
            <div className="cartrow">
                <div className="cartbox">
                    <h2>Login {AuthLoggedIn ? <button onClick={userLogout}>Logout</button> : ""}</h2>
                    {step === 'SEND_OTP' && (
                        <div className="step">
                            <div className="colmn-full">
                                <input type="number" value={identifier} 
                                    placeholder="Enter your Mobile" 
                                    onChange={(event)=>setIdentifier(event.target.value)}/>
                                <p className="error">{error}</p>
                            </div>
                            <div className="colmn-full">
                                {
                                    identifier?.length === 10 ? 
                                    <button onClick={SendLogin} className="cart-btn">Get OTP</button> :
                                    <button disabled className="cart-btn cart-btn002">Get OTP</button>
                                }                            
                            </div>
                        </div>
                    )}

                    {step === 'VERIFY_OTP' && (
                        <div className="step step2">
                            <div className="colmn-full">
                                <p>Enter the code from the sms we sent to {identifier}</p>
                                <input type="number" value={otpInput} 
                                    placeholder="Enter OTP" 
                                    onChange={(event)=>setOtpInput(event.target.value)}/>
                                    <p className="error">{error}</p>
                            </div>
                            <div className="colmn-full">
                                <p>Don't receive the OTP? <button onClick={SendLogin}>RESEND</button></p>
                            </div>
                            <div className="colmn-full">
                                 <button onClick={OtpSubmit} className="cart-btn">Submit</button>                       
                            </div>
                        </div>
                    )}
                    
                    
                </div>
            </div>
        </>
    );
}

export default Login;