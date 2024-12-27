
import './App.css'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Paste from './Components/Paste';
import ViewPaste from './Components/ViewPaste';
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element : 
      <div>
         <Navbar/>
         <Home/>
      </div>
    },
    {
      path:"/pastes",
      element : 
      <div>
         <Navbar/>
         <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element : 
      <div>
         <Navbar/>
         <ViewPaste/>

      </div>
    },
  ]
);


function App() {


  return (
   <div>
    <RouterProvider router = {router}/>
   </div>
  )
}

export default App
