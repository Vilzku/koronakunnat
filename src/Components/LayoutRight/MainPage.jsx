import React from 'react';
import { ReactComponent as Map } from '../../Assets/map.svg';

function MainPage(props) {

    return (
        <div className="MainPage">
            <div className="title"></div>
            <div className="lower"></div>
            <Map className="Map"/>
        </div>
    );
}

export default MainPage;