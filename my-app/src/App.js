import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/'  element={<Home />} />
        <Route  path='/blog/search' element={<Home />}/>
        <Route path='/signin'  element={<Signin />} />
        <Route path='/signup'  element={<Signup />} />
       </Routes>
    </div>
  );
}

export default App;
