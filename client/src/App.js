
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Repos from './pages/Repos';
import { Routes, Route } from'react-router-dom';
import { ToastContainer } from'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
     <Routes>
     <Route path='/' element= {<Home />}/>
     <Route path='/repos' element= {<Repos />}/>
     <Route path="*" element={<NotFound/>}/>
      </Routes> 
      <ToastContainer/>
    </>
  );
}

export default App;
