import styles from './FrontendUiTable.module.css';

/* eslint-disable-next-line */
export interface FrontendUiTableProps {}

export function FrontendUiTable(props: FrontendUiTableProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FrontendUiTable!</h1>
    </div>
  );
}

export default FrontendUiTable;
