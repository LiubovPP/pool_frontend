import React, { useEffect, useState } from "react";
import "@styles/SuanaPage.css"; // Предполагается, что у вас есть файл CSS для стилей
import saunaBackground from "@assets/saynabg.png";
import sauna1 from "@assets/sayna1.png";
import sauna2 from "@assets/sayna2.png";
import sauna3 from "@assets/sayna3.png";
import saunaBanner from "@assets/hamam1.png"
import saunaBanner1 from "@assets/hamam2.png"
import saunaBanner2 from "@assets/hamam3.png"
import saunaBanner3 from "@assets/hamam4.png"


const images = [saunaBanner, saunaBanner1, saunaBanner2, saunaBanner3];

const SaunaPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sauna-page">
            <section className="sauna-background" style={{backgroundImage: `url(${saunaBackground})`}}>
                <div className="sauna-content">
                    <h1>Сауны</h1>
                    <button className="call-button" type={"submit"}> Заказать звонок</button>
                </div>
            </section>
            <section className="sauna-key-features">
                <div className="container">
                    <h2>СТРОИТЕЛЬСТВО САУНЫ ПОД КЛЮЧ</h2>
                    <p>Спроектируем и возведем любую парную – частную или общественную, в ванной, на балконе или в
                        подвале.</p>
                    <div className="features-grid">
                        <div className="feature-item">
                            <img src={sauna1} alt="Замер + 3D проект"/>
                            <p>Замер + 3D проект</p>
                        </div>
                        <div className="feature-item">
                            <img src={sauna2} alt="Все материалы в наличии"/>
                            <p>Все материалы в наличии</p>
                        </div>
                        <div className="feature-item">
                            <img src={sauna3} alt="Составляем смету с пояснениями"/>
                            <p>Составляем смету с пояснениями</p>
                        </div>
                        <div className="feature-item">
                            <img src={sauna3} alt="2 года гарантии на монтаж"/>
                            <p>2 года гарантии на монтаж</p>
                        </div>
                        <div className="feature-item">
                            <img src={sauna3} alt="Обслуживание после гарантии"/>
                            <p>Обслуживание после гарантии</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="saunakak">
                <div className="container">
                    <div className="zagsauna">
                        <h2>Как заказать строительство сауны</h2>
                    </div>
                    <div className="etapysauna">
                        <div className="etapsaunasb">
                            <div className="etap-krug">
                                <div className="etap-krug-q">1</div>
                            </div>
                            <div className="етап-текст">
                                <p>Оставляете<br/>заявку</p>
                            </div>
                        </div>
                        <div className="etapsaunasb">
                            <div className="etap-krug">
                                <div className="етап-круг-к">2</div>
                            </div>
                            <div className="етап-текст">
                                <p>Консультация<br/>и предварительная<br/>смета</p>
                            </div>
                        </div>
                        <div className="etapsaunasb">
                            <div className="etap-krug">
                                <div className="етап-круг-к">3</div>
                            </div>
                            <div className="етап-текст">
                                <p>Подготовка<br/>чертежа</p>
                            </div>
                        </div>
                        <div className="etapsaunasb">
                            <div className="etap-krug">
                                <div className="етап-круг-к">4</div>
                            </div>
                            <div className="етап-текст">
                                <p>Подписание договора<br/>и оплата</p>
                            </div>
                        </div>
                        <div className="etapsaunasb">
                            <div className="etap-krug">
                                <div className="етап-круг-к">5</div>
                            </div>
                            <div className="етап-текст">
                                <p>Готовый<br/>сауна</p>
                            </div>
                        </div>
                        <div className="etapsaunasb">
                            <div className="etap-krug">
                                <div className="етап-круг-к">6</div>
                            </div>
                            <div className="етап-текст">
                                <p>Гарантийное<br/>обслуживание</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sauna-gallery">
                <div className="gallery-background" style={{backgroundImage: `url(${images[currentImageIndex]})`}}>
                    <div className="gallery-text">
                        <h2>Наши работы</h2>
                        <p>Компания «LifePool» всегда стремится решить все вопросы заказчика...</p>
                    </div>
                    <button className="gallery-nav left" onClick={prevImage}>‹</button>
                    <button className="gallery-nav right" onClick={nextImage}>›</button>
                </div>
            </section>

            <section className="contact-form">
                <div className="contact-content">
                    <div className="form-container">
                        <h3>ЗАКАЖИТЕ ЗВОНОК</h3>
                        <form>
                            <input type="text" name="name" placeholder="Имя" required/>
                            <input type="tel" name="phone" placeholder="Телефон" required/>
                            <button type="submit">ОТПРАВИТЬ</button>
                        </form>
                    </div>
                    <div className="info-container">
                        <h3>БЕСПЛАТНОЕ ПЕРВОЕ ОБСЛУЖИВАНИЕ</h3>
                        <p>Нам важно чтобы Вы сделали осознанный выбор своей сервисной компании</p>
                        <p>В целях экономии Вашего времени, мы с удовольствием ответим на все Ваши вопросы</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SaunaPage;
