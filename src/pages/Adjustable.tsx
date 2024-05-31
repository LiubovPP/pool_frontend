import  adjustableImage from '@assets/adjustable.jpg'

export default function Adjustable() {
  
    return (
      <div className="text">
        <div className="imageContainer">
           <img src={adjustableImage} alt="adjustable" className="image" /> 
          <div className="imageText">
            <h1>Бассейн с регулируемым дном</h1>
            {/* <h1>бассейны</h1> */}
        
          </div>
        </div>
        <form className="styles.card" action="card_1">
          
          <div className="specialistText">
             <h1 >Регулируемая глубина</h1>  
          </div>
        </form>
        <form className="styles.card_1" action="card_1">
          <div className="text_info">
         
             
          </div>
        </form>
      </div>
    )
}