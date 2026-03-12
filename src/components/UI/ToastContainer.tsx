import { useToast } from '../../context/ToastContext';
import styles from './ToastContainer.module.scss';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  };

  return (
    <div className={styles.container} role="alert" aria-live="polite">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`${styles.toast} ${styles[toast.type]}`}
        >
          <span className={styles.icon}>{getIcon(toast.type)}</span>
          <span className={styles.message}>{toast.message}</span>
          <button 
            className={styles.close} 
            onClick={() => removeToast(toast.id)}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
