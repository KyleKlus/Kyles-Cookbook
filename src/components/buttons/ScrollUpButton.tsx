/** @format */
import styles from '@/styles/components/buttons/ScrollUpButton.module.css';

interface IScrollUpButtonProps {
  isVisible: boolean;
}

export default function ScrollUpButton(
  props: React.PropsWithChildren<IScrollUpButtonProps>
) {
  const isVisibleClassName = props.isVisible ? ' ' + styles.isVisible : '';
  return (
    <button
      className={styles.scrollButton + isVisibleClassName}
      onClick={() => {
        const top = document.getElementById('top');
        if (top) { top.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); }
      }}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      {props.children}
    </button>
  );
}
