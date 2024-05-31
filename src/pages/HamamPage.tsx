import React from "react"
import "@styles/HamamPage.css"
import hamamsBackground from "@assets/hamam.png"

const HamamPage: React.FC = () => {
  return (
    <div className="hamam-page" style={{ backgroundImage: `url(${hamamsBackground})` }}>
      <div className="hamam-content">
        <h1>Хамамы</h1>
        <p>Турецкая баня хамам – это гармония здоровья семьи и бизнеса</p>
        <button className="call-button">Заказать звонок</button>
      </div>
    </div>
  )
}

export default HamamPage


