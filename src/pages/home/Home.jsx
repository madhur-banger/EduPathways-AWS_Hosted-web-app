import React from 'react'
import{useNavigate} from 'react-router-dom'
import "./home.css"
import Testomonials from '../../components/testtimonials/Testomonials'

const Home = () => {
  const navigate =useNavigate()
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>EduPathways</h1>
          <p>Empowering rural students with online education.</p>
          <button  onClick={()=>navigate("/courses")} className='common-btn'>Get Started</button>
        </div>
      </div>
      <Testomonials/>
    </div>
  )
}

export default Home;
