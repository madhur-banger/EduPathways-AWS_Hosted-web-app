import React from 'react'
import "./testtimonial.css"
const Testomonials = () => {
    const testimonialsData = [
        {
          id: 1,
          name: "Raj Malik",
          position: "Student",
          message:
            "EduPathways has opened up a world of knowledge for students like me in rural areas. I never thought I could access such quality education without spending money.",
          image:
            "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        },
        {
          id: 2,
          name: "Shubham",
          position: "Student",
          message:
            "With EduPathways, I can learn at my own pace.I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
          image:
            "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
        {
          id: 3,
          name: "Vijay",
          position: "Student",
          message:
            "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
          image:
            "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        },
        {
          id: 4,
          name: "Shraddha Kapoor",
          position: "Student",
          message:
            "EduPathways has been a game changer for me. As a student in a rural area, accessing quality education was a challenge.",
          image:
            "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
      ];
  return (
    <section className="testimonials">
        <h2>What our Students say About us</h2>
        <div className="testimonials-cards">
            {
                testimonialsData.map((e)=>(
                    <div className="testimonial-card" key={e.id}>
                        <div className="student-image">
                            <img src={e.image} alt="" />
                        </div>
                        <p className='message'>{e.message}</p>
                        <div className="info">
                            <p className='name'>{e.name}</p>
                            <p className='position'>{e.position}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Testomonials
