import React from "react";
import ReactDOM from "react-dom";
import AnonymousNavbar from "./AnonymousNavbar";
import Main from "./Main";
import Presentation from "./Presentation";
import Footer from './Footer';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div>
                <AnonymousNavbar />
                <Switch>
                    <Route path="/login">
                        <LoginComponent />
                    </Route>
                    <Route path="/register">
                        <RegisterComponent />
                    </Route>
                    <Route path="/">
                        <Presentation />
                        <Main />
                    </Route>
                </Switch>
                
                <Footer />
            </div>
        </Router>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));