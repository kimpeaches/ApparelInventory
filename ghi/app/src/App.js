import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatForm from './HatForm';
import HatList from './HatList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats/" element={<HatList />} />
          <Route path="/hats/create" element={<HatForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
