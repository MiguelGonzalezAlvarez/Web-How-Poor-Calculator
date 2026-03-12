import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './i18n/index';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { initAnalytics, trackPageView } from './lib/analytics';

const Home = lazy(() => import('./pages/Home'));

const AnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics({
      plausibleDomain: 'how-poor-i-am.com',
      gaMeasurementId: 'G-XXXXXXXXXX'
    });
  }, []);

  useEffect(() => {
    trackPageView(window.location.pathname, document.referrer);
  }, [location]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AnalyticsWrapper>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;
