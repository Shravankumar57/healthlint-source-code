import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { AnatomyPage } from './pages/AnatomyPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { HazardsPage } from './pages/HazardsPage';
import { BiosignalsPage } from './pages/BiosignalsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CountermeasuresPage } from './pages/CountermeasuresPage';
import { WellnessPage } from './pages/WellnessPage';
import { EnvironmentPage } from './pages/EnvironmentPage';
import { ResearchPage } from './pages/ResearchPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/anatomy" element={<AnatomyPage />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/hazards" element={<HazardsPage />} />
          <Route path="/biosignals" element={<BiosignalsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/countermeasures" element={<CountermeasuresPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/environment" element={<EnvironmentPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
