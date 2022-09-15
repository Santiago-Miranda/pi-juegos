import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage/LandingPage.jsx"
import Home from "./components/Home/Home.jsx"
import VideogameCreated from './components/VideogamesCreated/VideogamesCreated.jsx';
import Detail from './components/Detail/Detail.jsx';
import  ErrorRoute  from './components/error/ErrorRoute';

function App() {
  return (
    <BrowserRouter> {/* envolvemos las rutas con BrowserRouter por regla general de la version */}
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/> {/* se va a renderizar cada componente segun la direccion URL */}
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/videogame" element={<VideogameCreated/>}/>
        <Route exact path="/home/:id" element={<Detail/>}/>
        <Route path="*" element={<ErrorRoute/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
