import React, { useState } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import {decodeToken, isExpired} from "react-jwt";

const LoginComponent = () => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    


    const [userError, setUserError] = useState("");
    const [passError, setPassError] = useState("");
    const [authError, setAuthError] = useState("");

    const [_, setContextUser] = useContext(UserContext); 

    let history = useHistory();

    const submit = e => {
        e.preventDefault();
        if(user && pass){
            fetch('http://localhost:8079/signin', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify({username: user, password: pass})
            })
                .then(rez => rez.json())
                .then(e => {
                    if(e.response){
                        setAuthError('* Invalid combination of username and password');
                        history.push('/login');
                    }
                    else{
                        let x = decodeToken("Bearer " + e.token);
                        setContextUser(x);
                        window.localStorage.setItem('token', e.token);
                        history.push('/');
                    }
                });  
        }
    }

    const validateEmail = e => {
        if(!e.match('.+')){
            setUserError("* Username-ul trebuie sa contina minim un caracter");
            setUser("");
        }
        else{
            setUserError("");
            setUser(e);
        }
        
    }

    const validatePassword = e => {
        if(!e.match('.+')){
            setPassError("* Parola trebuie sa contina cel putin un caracter");
            setPass("");
        }
        else{
            setPassError("");
            setPass(e);
        }
    }

    return ( 
        <div className = "main-canvas" >
            <form onSubmit = { submit } className = "auth-form" >
                <div className = "mesaj" >
                    <h1><b> Logheaza-te in contul tau </b></h1> 
                    <h6 > Fiind logat vei putea salva evenimente care ti se par interesante precum si sa postezi evenimente </h6> 
                </div> 
                <h6 className="error-text">{authError}</h6>
                <div className = "input-login" >
                    <h6><b> Username* </b></h6> 
                    <input required type="text" onChange={ e => validateEmail(e.target.value) } placeholder="Username" /> 
                    <h6 className="error-text">{userError}</h6>
                </div> 
                <div className = "input-login" >
                    <h6 ><b> Parola* </b> </h6> 
                    <input required type="password" onChange={ e => validatePassword(e.target.value) } placeholder="Parola" /> 
                    <h6 className="error-text">{passError}</h6>
                </div>
                <button value="submit" className="auth-btn login"> Login </button>
                <Link to="/register" className="theme-text">
                    Nu ai cont?
                </Link>
                <hr/>
                <button className="auth-btn facebook" > 
                    Logheaza-te cu Facebook 
                </button>
            </form> 
            
        </div>
    )
}

export default LoginComponent;