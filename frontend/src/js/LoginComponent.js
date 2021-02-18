import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginComponent = () => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");


    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");

    const submit = e => {
        e.preventDefault();
    }

    const validateEmail = e => {
        if(!e.match('[a-zA-Z]+')){
            setUserError("* Username-ul trebuie sa contina minim 1 litera");
        }
        else{
            setUserError("");
        }
        setUser(e);
    }

    const validatePassword = e => {
        if(!e.match('[a-zA-Z]+[0-9]+') && !e.match('[0-9]+[a-zA-Z]+')){
            setPassError("* Parola trebuie sa contina cel putin o cifra si o litera")
        }
        else{
            setPassError("");
        }
        setPass(e);
    }

    return ( 
        <div className = "main-canvas" >
            <form onSubmit = { submit } className = "auth-form" >
                <div className = "mesaj" >
                    <h1> Logheaza-te in contul tau </h1> 
                    <h6 > Fiind logat vei putea salva evenimente care ti se par interesante precum si sa postezi evenimente </h6> 
                </div> 
                <div className = "input-login" >
                    <h6> Username* </h6> 
                    <input required type="text" onChange={ e => validateEmail(e.target.value) } placeholder="Username" /> 
                    <h6 className="error-text">{userError}</h6>
                </div> 
                <div className = "input-login" >
                    <h6 > Parola* </h6> 
                    <input required type="password" onChange={ e => validatePassword(e.target.value) } placeholder="Parola" /> 
                    <h6 className="error-text">{passError}</h6>
                </div>
                <button value="submit" className="auth-btn login"> Login </button>
                <Link to="/register" className="theme-text">
                    Nu ai cont?
                </Link>
                <hr/>
                <button className="auth-btn facebook"> Logheaza-te cu Facebook </button>
            </form> 
            
        </div>
    )
}

export default LoginComponent;