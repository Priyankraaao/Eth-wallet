import styles from "./styles.module.css";

const WrapperBox = ({ children, title = "" }) => {
  return (
    <div className={styles.parentContainer}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default WrapperBox;
