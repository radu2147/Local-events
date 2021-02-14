import React from "react";
import ReactDOM from "react-dom";
import AnonymousNavbar from "./AnonymousNavbar";
import Main from "./Main";
import Presentation from "./Presentation";
import Footer from './Footer';

const App = () => {
    return (
        <div>
            <AnonymousNavbar />
            <Presentation />
            <Main />
            <Footer />
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));