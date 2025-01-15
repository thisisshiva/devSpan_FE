import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './body';
import Login from "./components/login";
import Feed from './components/feed';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Body/>} >
          <Route path='/login' element={<Login/>}/>
          <Route path='/feed' element={<Feed/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
