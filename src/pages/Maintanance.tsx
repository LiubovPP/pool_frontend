import React from "react"
import styles from "../styles/Maintance.module.css"
import img from "../assets/maintanance.jpg"
import photo from "../assets/vladimir.jpg"


export default function Maintanance() {

  return (
    <div className={styles.text}>
      <div className={styles.imageContainer}>
        <img src={img} alt="maintenance" className={styles.image} />
        <div className={styles.imageText}>
          <h1>Обслуживание</h1>
          <h1>бассейнов</h1>
          <p>Даже самый маленький бассейн требует</p>
          <p>постоянного внимания и ухода</p>
        </div>
      </div>
      <form className={styles.card} action="card">
        <img src={photo} alt="Химей Владимир" className={styles.photo} />
        <div className={styles.specialistText}>
          <p>Химей Владимир</p>
          <p className={styles.text_spec}>Специалист по</p>
          <p className={styles.text_spec}>обслуживанию</p>
        </div>
        <div className={styles.serviceText}>
          <h3 className={styles.text_h3}> Компания LifePool предлагает услуги по обслуживанию бассейнов, находящихся в
            эксплуатации.</h3>
          <p className={styles.text_p}> На обслуживание принимаются бассейны, построенные и запущенные в эксплуатацию
            нашей организацией, а также сторонние объекты после их осмотра нашими специалистами.</p>
          <p className={styles.text_span}> “Наш подход позволяет избежать распространенных ошибок, сэкономить ваши
            средства и время.”</p>
        </div>
      </form>
      <form className={styles.card_1} action="card_1">
        <div className={styles.text_info}>
          <h1>35</h1>
          <h1 className={styles.text_1}>Бассейнов сейчас обслуживается</h1>

        </div>
      </form>
    </div>
  )
}