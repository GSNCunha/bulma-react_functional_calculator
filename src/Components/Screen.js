import React, { useContext } from 'react'
import {bufferContext} from "../App.js";

const Screen = () => {
    const {buffer} = useContext(bufferContext);
    return(
        <div className="column is-12">
            <p  className="has-text-weight-bold notification is-black  has-text-right">
                {buffer}
            </p>
        </div>
    );
};
export default Screen;