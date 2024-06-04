
import React, {useEffect, useState} from "react";
import "@styles/HamamPage.css"; // Предполагается, что у вас есть файл CSS для стилей
import hamamsBackground from "@assets/hamam.png";
import hamam1 from "@assets/hamam-i1.png";
import hamam2 from "@assets/hamam-i2.png";
import hamam3 from "@assets/hamam-i3.png";
import band from "@assets/banndd.png";
import hamamBanner from "@assets/hamam1.png"
import hamamBanner1 from "@assets/hamam2.png"
import hamamBanner2 from "@assets/hamam3.png"
import hamamBanner3 from "@assets/hamam4.png"
import logobann from "@assets/logobann.png"


const images = [hamamBanner, hamamBanner1, hamamBanner2, hamamBanner3];
const HamamPage: React.FC = () => {
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
        <div className="hamam-page">
            <section className="hamam-background" style={{ backgroundImage: `url(${hamamsBackground})` }}>
                <div className="hamam-content">
                    <h1>Хамамы</h1>
                    <p>Турецкая баня хамам – это гармония здоровья семьи и бизнеса</p>
                    <button className="call-button" type={"submit"}> Заказать звонок</button>
                </div>
            </section>
            <section className="hamam-ee">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="hamam-xh">
                                <div className="hamam-item">
                                    <div className="hamam-icon">
                                        <img src={hamam1} alt="Проектирование хамама" />
                                    </div>
                                    <div className="hamam-text">
                                        <h3>Проектирование хамама</h3>
                                        <p>Профессиональное проектирование хамама: строительство хамам начинается с составления грамотной проектной документации, учитывающей не только проекты бань и саун с точки зрения самой постройки, но и традиционных особенностей.</p>
                                    </div>
                                </div>
                                <div className="hamam-item">
                                    <div className="hamam-icon">
                                        <img src={hamam2} alt="Проектирование хамама" />
                                    </div>
                                    <div className="hamam-text">
                                        <h3>Проектирование хамама</h3>
                                        <p>Профессиональное проектирование хамама: строительство хамам начинается с составления грамотной проектной документации, учитывающей не только проекты бань и саун с точки зрения самой постройки, но и традиционных особенностей.</p>
                                    </div>
                                </div>
                                <div className="hamam-item">
                                    <div className="hamam-icon">
                                        <img src={hamam3} alt="Проектирование хамама" />
                                    </div>
                                    <div className="hamam-text">
                                        <h3>Проектирование хамама</h3>
                                        <p>Профессиональное проектирование хамама: строительство хамам начинается с составления грамотной проектной документации, учитывающей не только проекты бань и саун с точки зрения самой постройки, но и традиционных особенностей.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mannerf" style={{
                            backgroundImage: `url(${band})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}>
                            <div className="hamam-bann">
                                <img src={logobann} alt="Строительство хамамов под ключ" />
                                <p>Строительство хамамов под ключ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hamamkak">
                <div className="container">
                    <div className="zaghamam">
                        <h2>Как заказать строительство хамама</h2>
                    </div>
                    <div className="etapyhamam">
                        <div className="etaphamamsb">
                            <div className="etap-krug">
                                <div className="etap-krug-q">1</div>
                            </div>
                            <div className="etap-text">
                                <p>Оставляете<br />заявку</p>
                            </div>
                        </div>
                        <div className="etaphamamsb">
                            <div className="etap-krug">
                                <div className="etap-krug-q">2</div>
                            </div>
                            <div className="етап-текст">
                                <p>Консультация<br />и предварительная<br />смета</p>
                            </div>
                        </div>
                        <div className="etaphamamsb">
                            <div className="etap-krug">
                                <div className="етап-круг-q">3</div>
                            </div>
                            <div className="етап-текст">
                                <p>Подготовка<br />чертежа</p>
                            </div>
                        </div>
                        <div className="etaphamamsb">
                            <div className="etap-krug">
                                <div className="етап-круг-q">4</div>
                            </div>
                            <div className="етап-текст">
                                <p>Подписание договора<br />и оплата</p>
                            </div>
                        </div>
                        <div className="etaphamamsb">
                            <div className="etap-krug">
                                <div className="етап-круг-q">5</div>
                            </div>
                            <div className="етап-текст">
                                <p>Готовый<br />хамам</p>
                            </div>
                        </div>
                        <div className="etaphamamsb">
                            <div className="etap-krug">
                                <div className="етап-круг-q">6</div>
                            </div>
                            <div className="етап-текст">
                                <p>Гарантийное<br />обслуживание</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hamam-gallery">
                <div className="gallery-background" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
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
                            <input type="tel" name="phone" placeholder="Телефон" required />
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

export default HamamPage;