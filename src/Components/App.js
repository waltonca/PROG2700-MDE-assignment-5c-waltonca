import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import NavBar from "./NavBar";
import RandomGame from "./RandomGame";
import SampleGame from "./SampleGame";

const App = () => {
  return (
    <>      
      <NavBar/>

      <Routes>          
          <Route path="/" element={<Home/>} />
          <Route path="/sample" element={<SampleGame />} />
          <Route path="/random" element={<RandomGame />} />
       </Routes>
    
    </>
  );
}

export default App;
