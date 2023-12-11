import { useState, useEffect } from 'react';
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Sidebar from './components/Nav/Sidebar';
import Inbox from './components/Inbox/Inbox';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

const HandleAuth = ()=>{
    localStorage.setItem('user', "true");
    window.location.replace('/');
  return <>
  <h1 className='text-center'>Redirecting to home page</h1>
  </>
}

function App() {
  const [userflag , setFlag] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("user")) setFlag(true);
  },[]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      {userflag ? (<>
              <Sidebar>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/list' element={<Inbox/>}/>
                <Route path='/logout' element={<Logout/>}/>
            </Routes>
            </Sidebar>
            </>): (<Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/auth' element={<HandleAuth/>}/>
            </Routes>)}
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;


