import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import SummaryPage from './pages/SummaryPage';
import EditPage from './pages/EditPage';
import DetailPage from './pages/DetailsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="p-4 bg-green-500 text-white font-bold text-xl">
        <Routes>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/" element={<SummaryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
