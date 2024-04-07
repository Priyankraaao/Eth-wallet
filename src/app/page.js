import styles from "./page.module.css";
import TransactionForm from "./component/Transfer";
import BalanceForm from "./component/Balance";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <BalanceForm />
        <TransactionForm />
      </div>
    </main>
  );
}
