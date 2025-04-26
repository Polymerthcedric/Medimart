import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproduct from './Components/AddProduct';
import Getproducts from './Components/GetProduct';
import Makepayment from './Components/MakePayment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/addproduct' element={<Addproduct />} />
            <Route path='/' element={<Getproducts />} />
            <Route path='/makepayment' element={<Makepayment />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;