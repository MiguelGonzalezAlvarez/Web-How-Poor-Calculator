import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { useShare } from '../../hooks';
import styles from './ShareButton.module.scss';

const ShareButton: React.FC = () => {
  const { t } = useTranslation();
  const { generateUrl, copyToClipboard, shareToSocial, copied, isCalculated } = useShare();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isCalculated) return null;

  const shareUrl = generateUrl();

  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className={styles.shareContainer}>
      <button className={styles.shareButton} onClick={handleCopy}>
        {copied ? '✓' : '🔗'} {copied ? t('share.copied') : t('share.share')}
      </button>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          {t('share.linkCopied')}
        </div>
      )}

      <button 
        className={styles.qrButton}
        onClick={() => setShowQR(!showQR)}
        title="QR Code"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="3" height="3" />
          <rect x="18" y="14" width="3" height="3" />
          <rect x="14" y="18" width="3" height="3" />
          <rect x="18" y="18" width="3" height="3" />
        </svg>
      </button>

      <div className={styles.socialButtons}>
        <button 
          className={styles.socialButton} 
          onClick={() => shareToSocial('twitter')}
          title="Twitter"
        >
          𝕏
        </button>
        <button 
          className={styles.socialButton} 
          onClick={() => shareToSocial('linkedin')}
          title="LinkedIn"
        >
          in
        </button>
        <button 
          className={styles.socialButton} 
          onClick={() => shareToSocial('facebook')}
          title="Facebook"
        >
          f
        </button>
        <button 
          className={styles.socialButton} 
          onClick={() => shareToSocial('whatsapp')}
          title="WhatsApp"
        >
          💬
        </button>
      </div>

      {showQR && shareUrl && (
        <div className={styles.qrModal} onClick={() => setShowQR(false)}>
          <div className={styles.qrContent} onClick={e => e.stopPropagation()}>
            <h3 className={styles.qrTitle}>{t('share.qrCode')}</h3>
            <div className={styles.qrCode}>
              <QRCodeSVG 
                value={shareUrl}
                size={180}
                level="M"
                includeMargin={false}
              />
            </div>
            <p className={styles.qrHint}>{t('share.qrHint')}</p>
            <button 
              className={styles.closeButton}
              onClick={() => setShowQR(false)}
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
