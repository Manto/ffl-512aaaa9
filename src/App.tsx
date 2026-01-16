import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TrainingLibrary from './pages/TrainingLibrary';
import TrainingModule from './pages/TrainingModule';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/training" element={<TrainingLibrary />} />
        <Route path="/training/:moduleId" element={<TrainingModule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
