import { useEffect } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adClient?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
}

const AdSense: React.FC<AdSenseProps> = ({ 
  adSlot = 'YOUR_AD_SLOT_ID',
  adClient = 'YOUR_AD_CLIENT_ID',
  adFormat = 'auto'
}) => {
  useEffect(() => {
    const isAdSenseConfigured = adSlot !== 'YOUR_AD_SLOT_ID' && adClient !== 'YOUR_AD_CLIENT_ID';
    
    if (isAdSenseConfigured) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adSlot, adClient]);

  const isConfigured = adSlot !== 'YOUR_AD_SLOT_ID' && adClient !== 'YOUR_AD_CLIENT_ID';

  if (!isConfigured) {
    return null;
  }

  return (
    <div className="adsense-container" style={{ margin: '24px 0', textAlign: 'center', minHeight: '90px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export const AdSenseBanner: React.FC = () => {
  return (
    <AdSense 
      adSlot="XXXXXXXXX" 
      adClient="ca-pub-XXXXXXXXXXXXX" 
      adFormat="horizontal"
    />
  );
};

export const AdSenseRectangle: React.FC = () => {
  return (
    <AdSense 
      adSlot="XXXXXXXXX" 
      adClient="ca-pub-XXXXXXXXXXXXX" 
      adFormat="rectangle"
    />
  );
};

export const AdSenseInArticle: React.FC = () => {
  return (
    <AdSense 
      adSlot="XXXXXXXXX" 
      adClient="ca-pub-XXXXXXXXXXXXX" 
      adFormat="auto"
    />
  );
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default AdSense;
