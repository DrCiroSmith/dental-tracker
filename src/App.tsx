import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clinics from './pages/Clinics';

import AddClinic from './pages/AddClinic';
import LogHours from './pages/LogHours';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/clinics/new" element={<AddClinic />} />
          <Route path="/log" element={<LogHours />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
