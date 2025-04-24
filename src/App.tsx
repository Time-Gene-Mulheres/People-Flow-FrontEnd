import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

function App() {
  return (
    <Home>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
