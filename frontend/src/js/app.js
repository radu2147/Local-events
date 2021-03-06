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
import EventPage from "./EventPage";
import UpdateEvent from "./UpdateEvent";

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
                
                    <Switch>
                        <Route path="/event/:id">
                            <EventPage />
                        </Route>
                        <Route path="/login">
                            <LoginComponent />
                        </Route>
                        <Route path="/register">
                            <RegisterComponent />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>

                        <Route path="/update-event/:id">
                            <UpdateEvent />
                        </Route>
                        
                        <Route path="/">
                            <Presentation />
                            <Main />
                        </Route>
                    </Switch>
                    
                    <Footer />
                </UserContext.Provider>
            </div>
        </Router>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));