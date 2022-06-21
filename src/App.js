import './App.css';
import React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
// import OldVersion from './OldVersion';
import NewVersion from './NewVersion';

function App() {


  return (
    <>
      <ChakraProvider>
        {/* <OldVersion /> */}
        <NewVersion />
      </ChakraProvider>
    </>

  );
}

export default App;