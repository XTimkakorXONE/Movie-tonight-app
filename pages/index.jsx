import { GetButton } from "../components/GetButton/GetButton";
import styles from "../styles/index.module.scss";

export default function Home() {
  return (
    <div className={styles.wrap}>
      <div className={styles.image} />
      <h1 className={styles.title}>Welcome to Movie App</h1>
      <div className={styles.subtitle}>
        The best movie app of the galaxy to help you find a movie for tonight
      </div>
      <GetButton />
    </div>
  );
}
