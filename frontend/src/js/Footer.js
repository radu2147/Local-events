import React from "react";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <img src={require('../../static/logo.png')} />
                <p>Fii la curent cu ce se intampla in orasul tau</p>
                <div className="social">
                    <a href="https://www.facebook.com/radu.baston.7/" target="_blank" rel="noopener noreferrer">
                        <h6>
                            Facebook
                        </h6>
                    </a>
                    <a href="https://github.com/radu2147" target="_blank" rel="noopener noreferrer">
                        <h6>
                            Github
                        </h6>
                    </a>
                    <a  href="https://www.linkedin.com/in/radu-baston-a99960185/" target="_blank" rel="noopener noreferrer">
                        <h6>
                            Linkedin
                        </h6>
                    </a>
                </div>
                {/* <h6>Logo made with https://www.freelogodesign.org/</h6> */}
                <h6>©Radu Baston</h6>

            </div>
        </footer>
    )
}

export default Footer;