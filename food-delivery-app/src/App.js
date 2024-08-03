import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (

  <main className='pb-14 lg:pb-0'>
    <Navbar/>
    <div className = 'pt-16'>
      <Home/>
    </div>
    <Footer/>
  </main>

  )
}

export default App;
