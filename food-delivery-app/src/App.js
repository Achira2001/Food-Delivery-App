import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Signup from './pages/Signup';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (

    <CartProvider>
    <Router>
      <div>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/createUser' element={<Signup/>}/>
        </Routes>
      <Footer/>
      </div>
    </Router>
    </CartProvider>

  )
}

export default App;
