import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrainingModule from './pages/TrainingModule';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrainingModule />} />
        <Route path="/training/:moduleId" element={<TrainingModule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
