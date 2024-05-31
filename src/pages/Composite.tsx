
import img from '../assets/composite.jpg'
import styles from '../styles/Composite.module.css'

export default function Composite() {
  
    return (
      <div className={styles.text}>
        <div className={styles.imageContainer}>
          <img src={img} alt="composite" className={styles.image} />
          <div className={styles.imageText}>
            <h1>Композитные </h1>
            <h1>бассейны</h1>
        
          </div>
        </div>
        <form className={styles.card} action="card_1">
          
          <div className={styles.specialistText}>
             <h1>Briliant</h1>  
          </div>
        </form>
        <form className={styles.card_1} action="card_1">
          <div className={styles.text_info}>
         
             
          </div>
        </form>
      </div>
    )
}