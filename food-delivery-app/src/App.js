import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

function App() {
  return (

    <Router>
      <div>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      <Footer/>
      </div>
    </Router>

  )
}

export default App;
