import React, { useContext } from 'react'
import {bufferContext} from "../App.js";
import {buttonClick} from "../logic.js"

const ButtonWarning = (props) => {

    const {setBuffer, buffer} = useContext(bufferContext);

    return(
        <div className="column is-one-quarter ">
            <button onClick={() => setBuffer(buttonClick(props.charKey, buffer))} className=" button sizestyle has-text-weight-bold notification is-warning has-text-centered">
            {props.charKey}
            </button>
        </div>
    );
};
export default ButtonWarning;

