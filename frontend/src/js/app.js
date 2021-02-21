import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import Presentation from "./Presentation";
import Footer from './Footer';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import UserContext from "./UserContext";
import { useState } from "react";
import Navbar from "./Navbar";
import { decodeToken, isExpired } from "react-jwt";
import Profile from "./Profile";

const App = () => {

    let value;
    if(!isExpired(window.localStorage.getItem('token'))){
        value = decodeToken(window.localStorage.getItem('token'));
    } 
    else if(window.localStorage.getItem('token') !== null){
        window.localStorage.clear();
        alert("Your session has expired");
    } 
    const [user, setUser] = useState(value);

    return (
        <Router>
            <div>
                <UserContext.Provider value={[user,setUser]}>
                    <Navbar />
                </UserContext.Provider>
                <Switch>
                    <Route path="/login">
                        <UserContext.Provider value={[user,setUser]}>
                            <LoginComponent />
                        </UserContext.Provider>
                    </Route>
                    <Route path="/register">
                        <RegisterComponent />
                    </Route>
                    <Route path="/profile">
                        <UserContext.Provider value={user} >
                            <Profile />
                        </UserContext.Provider>
                    </Route>
                    <Route path="/">
                        <Presentation />
                        <UserContext.Provider value={user} >
                            <Main />
                        </UserContext.Provider>
                    </Route>
                </Switch>
                
                <Footer />
            </div>
        </Router>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));