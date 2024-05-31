import img from "../assets/composite.jpg"
import styles from "../styles/Composite.module.css"

export default function Composite() {

  return (
    <div className={styles.text}>
      <div className={styles.imageContainer}>
        <img src={img} alt="composite" className={styles.image} />
        <div className={styles.imageText}>
          <h1>Компазитные </h1>
          <h1>бассейны</h1>
          {/* <p>Даже самый маленький бассейн требует</p>
            <p>постоянного внимания и ухода</p> */}
        </div>
      </div>
      <form className={styles.card} action="card_1">
        {/* <img src={photo} alt="Химей Владимир" className={styles.photo} /> */}
        <div className={styles.specialistText}>
          <h1>Briliant</h1>
          <p className={styles.text_spec}>Классическая форма чаши. Зоной отдыха здесь могут служить широкие угловые
            ступени.</p>
          <p className={styles.text_spec}>Цвет:</p>
        </div>
        <div className={styles.serviceText}>
          {/* <h3 className={styles.text_h3}> Компания LifePool предлагает услуги по обслуживанию бассейнов, находящихся в эксплуатации.</h3>
            <p className={styles.text_p}> На обслуживание принимаются бассейны, построенные и запущенные в эксплуатацию нашей организацией, а также сторонние объекты после их осмотра нашими специалистами.</p>
            <p className={styles.text_span}> “Наш подход позволяет избежать распространенных ошибок, сэкономить ваши средства и время.”</p> */}
        </div>
      </form>
      <form className={styles.card_1} action="card_1">
        <div className={styles.text_info}>
          {/* <h1 >35</h1>
            <h1 className={styles.text_1}>Бассейнов сейчас обслуживается</h1> */}

        </div>
      </form>
    </div>
  )
}