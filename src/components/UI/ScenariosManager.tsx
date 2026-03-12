import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useToast } from '../../context/ToastContext';
import styles from './ScenariosManager.module.scss';

const ScenariosManager: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    savedScenarios, 
    saveScenario, 
    loadScenario, 
    deleteScenario, 
    toggleScenarioFavorite,
    isCalculated,
    salary,
    currency
  } = useAppStore();
  const { showToast } = useToast();
  
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const dateLocale = i18n.language === 'es' ? es : enUS;

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), 'PP', { locale: dateLocale });
  };

  const handleSave = () => {
    if (scenarioName.trim()) {
      saveScenario(scenarioName.trim(), scenarioDescription.trim() || undefined);
      setScenarioName('');
      setScenarioDescription('');
      setShowSaveModal(false);
      showToast(t('scenarios.saved'), 'success');
    }
  };

  const handleLoad = (id: string) => {
    loadScenario(id);
    showToast(t('scenarios.loaded'), 'success');
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteScenario(deleteId);
      showToast(t('scenarios.deleted'), 'success');
      setDeleteId(null);
    }
  };

  const canSave = isCalculated && salary && parseFloat(salary) > 0;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('scenarios.title')}</h3>
        <button 
          className={styles.saveButton}
          onClick={() => setShowSaveModal(true)}
          disabled={!canSave}
          title={!canSave ? t('scenarios.noScenariosHint') : ''}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {t('scenarios.saveCurrent')}
        </button>
      </div>

      {savedScenarios.length === 0 ? (
        <div className={styles.empty}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <p className={styles.emptyText}>{t('scenarios.noScenarios')}</p>
          <p className={styles.emptyHint}>{t('scenarios.noScenariosHint')}</p>
        </div>
      ) : (
        <div className={styles.list}>
          {savedScenarios
            .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
            .map((scenario) => (
            <div key={scenario.id} className={styles.item}>
              <button 
                className={styles.itemContent}
                onClick={() => handleLoad(scenario.id)}
              >
                <div className={styles.itemMain}>
                  <div className={styles.itemHeader}>
                    <span className={styles.scenarioName}>{scenario.name}</span>
                    {scenario.isFavorite && (
                      <svg className={styles.favoriteIcon} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                  </div>
                  {scenario.description && (
                    <p className={styles.description}>{scenario.description}</p>
                  )}
                  <div className={styles.meta}>
                    <span className={styles.salary}>
                      {formatCurrency(scenario.salary, scenario.currency)}
                    </span>
                    <span className={styles.separator}>•</span>
                    <span className={styles.resultsCount}>
                      {t('scenarios.resultsCount', { count: scenario.results.length })}
                    </span>
                  </div>
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.date}>
                    {t('scenarios.createdAt')}: {formatDate(scenario.createdAt)}
                  </span>
                </div>
              </button>
              <div className={styles.actions}>
                <button 
                  className={styles.actionButton}
                  onClick={(e) => { e.stopPropagation(); toggleScenarioFavorite(scenario.id); }}
                  title={scenario.isFavorite ? t('scenarios.unfavorite') : t('scenarios.favorite')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={scenario.isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={(e) => { e.stopPropagation(); handleDelete(scenario.id); }}
                  title={t('scenarios.delete')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSaveModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSaveModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{t('scenarios.save')}</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('scenarios.name')}</label>
              <input
                type="text"
                className={styles.input}
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder={t('scenarios.namePlaceholder')}
                autoFocus
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t('scenarios.description')}</label>
              <textarea
                className={styles.textarea}
                value={scenarioDescription}
                onChange={(e) => setScenarioDescription(e.target.value)}
                placeholder={t('scenarios.descriptionPlaceholder')}
                rows={3}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setShowSaveModal(false)}>
                {t('common.cancel') || 'Cancel'}
              </button>
              <button 
                className={styles.confirmButton} 
                onClick={handleSave}
                disabled={!scenarioName.trim()}
              >
                {t('scenarios.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className={styles.modalOverlay} onClick={() => setDeleteId(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{t('scenarios.delete')}</h3>
            <p className={styles.confirmText}>{t('scenarios.confirmDelete')}</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setDeleteId(null)}>
                {t('common.cancel')}
              </button>
              <button 
                className={styles.deleteConfirmButton} 
                onClick={confirmDelete}
              >
                {t('scenarios.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenariosManager;
