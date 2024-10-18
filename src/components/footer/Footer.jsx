import React from 'react'
import "./footer.css"
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";


const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2024 EduPathways Platform. All rights reserved. <br />
                 Made with ❤️ <a href="">Madhur</a>
            </p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/madhur-b-5539612a9/" target='_blank'>
                <AiFillLinkedin />
                </a>
                <a href="https://github.com/madhur-banger" target='_blank'>
                <AiFillGithub />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
