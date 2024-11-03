import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Characters from './pages/Characters';
import Planets from './pages/Planets';
import Starships from './pages/Starships';
import CharactersDetails from './components/CharactersDetails';
import PlanetDetails from './components/PlanetDetails';
import StarshipDetails from './components/StarshipDetails';


const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/characters' element={<Characters />} />
          <Route path='/characters/:name' element={<CharactersDetails/>}/>
          <Route path='/planets' element={<Planets />} />
          <Route path='/planets/:name' element={<PlanetDetails/>}/>
          <Route path='/starships' element={<Starships />} />
          <Route path='/starships/:name' element={<StarshipDetails/>}/>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
