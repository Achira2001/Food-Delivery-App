import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './pages/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content-wrap">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/createUser' element={<Signup />} />
              <Route exact path='/myOrder' element={<MyOrder />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App;
