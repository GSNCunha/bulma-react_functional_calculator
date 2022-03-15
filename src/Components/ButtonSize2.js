import React, { useContext } from 'react'
import {bufferContext} from "../App.js";
import {buttonClick} from "../logic.js"


const ButtonSize2 = (props) => {

    const {setBuffer, buffer} = useContext(bufferContext);

    return(
        <div className="column is-half">
            <button onClick={() => setBuffer(buttonClick(props.charKey, buffer))} className="button sizestyle notification has-text-centered has-text-weight-bold">
            {props.charKey}
            </button>
        </div>    
    );
};
export default ButtonSize2;

