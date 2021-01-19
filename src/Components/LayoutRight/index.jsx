import React from 'react';

import LocalStats from './LocalStats.jsx';
import HcdStats from './HcdStats.jsx';
import CumulativeGraph from './CumulativeGraph.jsx';
import WeeklyGraph from './WeeklyGraph.jsx';
import MainPage from './MainPage.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

function LayoutRight(props) {

    // Homepage
    if(props.selectedCity === null) {
        return (
            <div className="LayoutRight">
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    size="2x"
                    className="helpIcon"
                    onClick={ () => props.onButtonClicked(null) }/>
                <MainPage
                    hcdList={props.hcdList}/>
            </div>
        );

    // Selected city information
    } else {
        return (
            <div className="LayoutRight">
                <FontAwesomeIcon
                    icon={faTimes}
                    size="2x"
                    className="closeIcon"
                    onClick={ () => props.onButtonClicked(null) }/>
                <LocalStats selectedCity={props.selectedCity}/>
                <HcdStats />
                <CumulativeGraph selectedCity={props.selectedCity}
                                weeklyHcdCases={props.weeklyHcdCases}/>
                <WeeklyGraph />
            </div>
        );
    }

    
}

export default LayoutRight;