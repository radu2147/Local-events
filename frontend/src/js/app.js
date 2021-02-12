import React from "react";
import ReactDOM from "react-dom";
import AnonymousNavbar from "./AnonymousNavbar";
import Main from "./Main";
import Presentation from "./Presentation";

const App = () => {
    return (
        <div>
            <AnonymousNavbar />
            <Presentation />
            <Main />
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));