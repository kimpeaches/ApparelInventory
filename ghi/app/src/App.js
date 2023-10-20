import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesForm from './ShoesForm';
import ShoesList from './ShoesList';
import HatForm from './HatForm';
import HatList from './HatList';


function App() {
  return (
    <div style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1642418423389-fff4d83d28a4?auto=format&fit=crop&q=80&w=1867&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "100vh",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats/" element={<HatList />} />
          <Route path="/hats/create" element={<HatForm />} />
          <Route path="/shoes" element={<ShoesList />} />
          <Route path="/shoes/create" element={<ShoesForm />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
