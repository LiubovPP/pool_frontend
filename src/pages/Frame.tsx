 

 import frame from '@assets/frame.jpg'
 import fram from '@assets/frame.png'
 import '@styles/Frame.css'

 
        
  const Frame: React.FC = () => {
  return (
    <div className="container_frame">
          <div className="frame_content">
             <div className="img_text">
               <h1>Каркасные </h1>
               <h1> бассейны</h1>
    </div>
            <img src={frame} alt="frame" className="image" /> 
             <div className="card_text">
             <img className="img" src={fram} alt="frame"   />
               <h2>SUMMERESCAPES P20-1252-Z</h2>
               <p>
                 Бассейн каркасный SUMMERESCAPES (P20-1252-Z) выгодно выделяется среди многих моделей, благодаря своей усиленной конструкции. Металлические элементы каркаса способны выдержать немалый уровень нагрузки. Чаша выполнена из качественного ПВХ, который дополнен прочной армирующей сеткой.
               <p>
                 Размеры от: <p>Длина 5,2м Ширина 2,6м. Глубина 1,5м.</p><span>От <b>670.000</b> руб.</span>
                 </p>
              </p>
    </div>
      </div>
        </div>
           );
         };

      export default Frame;