import React from "react"
import '@styles/Maintance.module.css'
import maintananceImg from "../assets/maintanance.jpg"
import photo from "../assets/vladimir.jpg"


 

const Maintanance: React.FC = () => {
  return (
    <div className="container">
      <div className="maintanance_cont">
        <div className="img_text">
        <h1 >Обслуживание</h1>
        <h1>бассейнов </h1>
        <p>Даже самый маленький бассейн требует</p>
        <p>постоянного внимания и ухода</p>
       </div>
      <img src={maintananceImg} alt="maintanance" className="image" /> 
      <div className="container_cart">
        <p className="text_cart">
          <h3>Компания LifePool предлагает услуги по обслуживанию бассейнов, находящихся в эксплуатации.</h3> 
        </p>
        <p>На обслуживание принимаются бассейны, постороенные и запущенные в эксплуатацию нашей организацией, а так же сторонние объекты после их осмотра нашими специалистами.</p>
        </div>
        <div className="cart_1">
        <p className="text_info"> 35 
         Бассейнов сейчас обслуживается  </p>
        </div>
        
      </div>
    </div>
  
  )
}

export default Maintanance ;