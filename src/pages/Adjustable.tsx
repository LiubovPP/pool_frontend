import  adjustableImage from '@assets/adjustable.jpg'
import '@styles/Adjustable.css'

 

const Adjustable: React.FC = () => {
  return (
    <div className="container">
      <div className="adjustable-content">
        <div className="img-text">
        <p >Бассейн с </p>
        <p >регулируемым </p>
        <p > дном</p>

        </div>
      <img src={adjustableImage} alt="adjustable" className="image" /> 
      <div className="blue-card">
        <p className="text-blue-card"><h1>Регулируемая глубина</h1> 
LifePool представляет новинку на Российском рынке: бассейны с регулируемой глубиной дна. С помощью системы Aqua Lift Вы можете за несколько секунд настроить желаемую глубину дна бассейна или превратить его в террасу.</p>
        </div>
        <div className="card-text">
        <p className="text">Регулируемое дно снабжено гидравлической системой, безопасно и удобно в использовании. Запатентованные технологии позволяют оборудовать таким дном бассейны любых размеров и форм. В идеале, регулируемое дно в бассейне должно быть предусмотрено на стадии проектирования, но при определенных технических возможностях установка возможна в действующий бассейн. Такому бассейну не нужно защитное покрывало, т.к. простота системы и быстрый запуск позволяет открыть или закрыть бассейн менее чем за минуту. Когда платформа полностью поднята, потеря тепла и влаги практически сводится к нулю. Кроме того, вода остается чистой и, следовательно, требует меньше ухода. Процесс поднятия и опускания дна бассейна практически мгновенен, чрезвычайно прост и абсолютно безопасен.</p>
        </div>
        
      </div>
    </div>
  
  )
}

export default Adjustable;
