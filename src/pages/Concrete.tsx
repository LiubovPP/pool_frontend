
import  concreteImage from '@assets/concrete.jpg'
import '@styles/Concrete.css'

// const Concrete: React.FC = () => {
//   return (
//     <div className="container-concrete">
//       <div className="concrete-content">
//         <div className="img-text">
//         <p >Бетонные бассейны</p>
//         </div>
//       <img src={concreteImage} alt="concrete" className="image" /> 
//       <div className="card-text">
//         <p className="text"><h1>БЕТОННЫЙ БАССЕЙН</h1> Бассейн, чаша которого выполнена из бетона. Это классический и давно используемый вариант строительства подобного типа.
//  <span>Специалисты компании LifePool выполнят работы по проектированию и строительству бетонного бассейна на высокопрофессиональном уровне и в самые кротчайшие сроки. Вам нужно просто связаться с нами и высказать свои пожелания остальные работы мы берем на себя.</span></p>
//         </div>
//         <div className="card">
//         <p className="text-card">  27 
// Бассейнов построено мастерами LifePool</p>
//         </div>
//         {/* <h1>Хамамы</h1>
//         <p>Турецкая баня хамам – это гармония здоровья семьи и бизнеса</p>
//         <button className="call-button">Заказать звонок</button> */}
//       </div>
//     </div>
  
//   )
// }

// export default Concrete;
 
const Concrete: React.FC = () => {
  return (
    <div className="container-concrete">
      <div className="concrete-content">
        <div className="img-text">
          <p>Бетонные </p>
          <p> бассейны</p>
        </div>
        <img src={concreteImage} alt="concrete" className="image" /> 
        <div className="card-text">
          <h1>БЕТОННЫЙ БАССЕЙН</h1>
          <p>
            Бассейн, чаша которого выполнена из бетона. Это классический и давно используемый вариант строительства подобного типа.
            <span>
              Специалисты компании LifePool выполнят работы по проектированию и строительству бетонного бассейна на высокопрофессиональном уровне и в самые кротчайшие сроки. Вам нужно просто связаться с нами и высказать свои пожелания, остальные работы мы берем на себя.
            </span>
          </p>
        </div>
        <div className="card">
          <p className="text-card"><h1>27</h1> бассейнов построено мастерами LifePool</p>
        </div>
      </div>
    </div>
  );
};

export default Concrete;