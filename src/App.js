import React, { createContext } from 'react';
import './App.css';
import { useState } from "react";

import Screen from './Components/Screen';
import ButtonSize1 from './Components/ButtonSize1';
import ButtonSize2 from './Components/ButtonSize2';
import ButtonSize3 from './Components/ButtonSize3';
import ButtonWarning from './Components/ButtonWarning';

export const bufferContext = createContext(null);

function App() {

  const [buffer, setBuffer] = useState("0");

  return (
    <bufferContext.Provider value={{buffer,setBuffer}}>
        <div className="container">
            <div className="block-calculator">
                <div className="columns is-gapless is-multiline">
                    <Screen operation='0'/>
                    <ButtonSize2 charKey ="C"/>
                    <ButtonSize1 charKey ="←"/>
                    <ButtonWarning charKey ="÷"/>
                    <ButtonSize1 charKey ="7"/>
                    <ButtonSize1 charKey ="8"/>
                    <ButtonSize1 charKey ="9"/>
                    <ButtonWarning charKey ="×"/>
                    <ButtonSize1 charKey ="4"/>
                    <ButtonSize1 charKey ="5"/>
                    <ButtonSize1 charKey ="6"/>
                    <ButtonWarning charKey ="-"/>
                    <ButtonSize1 charKey ="1"/>
                    <ButtonSize1 charKey ="2"/>
                    <ButtonSize1 charKey ="3"/>
                    <ButtonWarning charKey ="+"/>
                    <ButtonSize3 charKey ="0"/>
                    <ButtonWarning charKey ="="/>
                </div>
            </div>
        </div>
    </bufferContext.Provider>
  );
}
export default App;
