class Analytics {
  private plausibleDomain: string | null = null;
  private gaMeasurementId: string | null = null;
  private initialized = false;

  init(config: { plausibleDomain?: string; gaMeasurementId?: string }) {
    this.plausibleDomain = config.plausibleDomain || null;
    this.gaMeasurementId = config.gaMeasurementId || null;
    this.initialized = true;

    if (this.plausibleDomain) {
      this.initPlausible();
    }

    if (this.gaMeasurementId) {
      this.initGA();
    }
  }

  private initPlausible() {
    if (!this.plausibleDomain) return;

    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = this.plausibleDomain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  }

  private initGA() {
    if (!this.gaMeasurementId) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaMeasurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.gaMeasurementId);
  }

  trackPageView(url: string, referrer?: string) {
    if (!this.initialized) return;

    if (this.plausibleDomain) {
      this.trackPlausiblePageView(url, referrer);
    }

    if (this.gaMeasurementId) {
      this.trackGAPageView(url, referrer);
    }
  }

  trackEvent(eventName: string, props?: Record<string, string | number | boolean>) {
    if (!this.initialized) return;

    if (this.plausibleDomain) {
      this.trackPlausibleEvent(eventName, props);
    }

    if (this.gaMeasurementId) {
      this.trackGAEvent(eventName, props);
    }
  }

  private trackPlausiblePageView(url: string, referrer?: string) {
    const event = { url, referrer };
    
    if (window.plausible) {
      window.plausible('pageview', { props: event as Record<string, string | number | boolean> });
    }
  }

  private trackPlausibleEvent(eventName: string, props?: Record<string, string | number | boolean>) {
    if (window.plausible) {
      window.plausible(eventName, { props });
    }
  }

  private trackGAPageView(url: string, referrer?: string) {
    if (window.gtag) {
      window.gtag('config', this.gaMeasurementId, {
        page_path: url,
        page_referrer: referrer
      });
    }
  }

  private trackGAEvent(eventName: string, props?: Record<string, string | number | boolean>) {
    if (window.gtag) {
      window.gtag('event', eventName, props);
    }
  }
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const analytics = new Analytics();

export const trackPageView = (url: string, referrer?: string) => {
  analytics.trackPageView(url, referrer);
};

export const trackEvent = (eventName: string, props?: Record<string, string | number | boolean>) => {
  analytics.trackEvent(eventName, props);
};

export const initAnalytics = (config: { plausibleDomain?: string; gaMeasurementId?: string }) => {
  analytics.init(config);
};

export default analytics;
