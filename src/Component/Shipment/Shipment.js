import React, { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
    let [logedIn, setLogedIn] = useContext(UserContext);
    
    return (
        <div>
            <h1>This is shipment</h1>
        </div>
    );
};

export default Shipment;