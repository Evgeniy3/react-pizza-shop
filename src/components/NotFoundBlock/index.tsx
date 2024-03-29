import styles from './NotFoundBlock.module.scss';
import img from '../../assets/img/404.png'

export const NotFoundBlock: React.FC = () => {
    return (
      <div className={styles.root}>
        <h1>
          <span>😕</span>
          <br />
          Ничего не найдено
        </h1>
        <p className={styles.description}>
          К сожалени данная страница отсутствует в нашем интернет-магазине
        </p>
      </div>
    );
  };